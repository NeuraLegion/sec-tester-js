import { SecScan } from './SecScan';
import { resolvableInstance } from './SecRunner.spec';
import { IssueFound } from './IssueFound';
import {
  Issue,
  Scan,
  ScanFactory,
  Severity,
  TargetOptions,
  TestType
} from '@sec-tester/scan';
import {
  anything,
  deepEqual,
  instance,
  mock,
  objectContaining,
  reset,
  verify,
  when
} from 'ts-mockito';
import { DependencyContainer } from 'tsyringe';
import { Configuration } from '@sec-tester/core';
import { Formatter } from '@sec-tester/reporter';

describe('SecScan', () => {
  const tests = [TestType.XSS];

  const mockedContainer = mock<DependencyContainer>();
  const mockedConfiguration = mock<Configuration>();
  const mockedScanFactory = mock<ScanFactory>();
  const mockedScan = mock<Scan>();
  const mockedIssueFormatter = mock<Formatter>();

  const issueFormatter = instance(mockedIssueFormatter);
  const scanFactory = instance(mockedScanFactory);

  beforeEach(() => {
    when(mockedConfiguration.container).thenReturn(instance(mockedContainer));

    when(mockedScanFactory.createScan(anything(), anything())).thenResolve(
      resolvableInstance(mockedScan)
    );
  });

  afterEach(() => {
    reset<DependencyContainer | Configuration | ScanFactory | Scan | Formatter>(
      mockedContainer,
      mockedConfiguration,
      mockedScanFactory,
      mockedScan,
      mockedIssueFormatter
    );
  });

  describe('constructor', () => {
    it('should create instance', () => {
      expect(
        () => new SecScan({ tests }, scanFactory, issueFormatter)
      ).not.toThrowError();
    });
  });

  describe('run', () => {
    const target: TargetOptions = { url: 'http://foo.bar' };
    const issues: Issue[] = [
      {
        id: 'fooId',
        severity: Severity.HIGH
      } as Issue
    ];

    let secScan!: SecScan;

    beforeEach(() => {
      secScan = new SecScan({ tests }, scanFactory, issueFormatter);
    });

    it('should run scan with default threshold', async () => {
      when(mockedScan.expect(anything())).thenResolve();
      when(mockedScan.issues()).thenResolve([]);

      await secScan.run(target);

      verify(
        mockedScanFactory.createScan(objectContaining({ target }), anything())
      ).once();
      verify(mockedScan.expect(Severity.LOW)).once();
    });

    it('should run scan with latest set threshold', async () => {
      when(mockedScan.expect(anything())).thenResolve();
      when(mockedScan.issues()).thenResolve([]);

      secScan.threshold(Severity.MEDIUM);
      secScan.threshold(Severity.HIGH);
      await secScan.run(target);

      verify(
        mockedScanFactory.createScan(objectContaining({ target }), anything())
      ).once();
      verify(mockedScan.expect(Severity.HIGH)).once();
    });

    it('should run scan with provided timeout', async () => {
      when(mockedScan.expect(anything())).thenResolve();
      when(mockedScan.issues()).thenResolve([]);

      secScan.timeout(42);
      await secScan.run(target);

      verify(
        mockedScanFactory.createScan(
          objectContaining({ target }),
          deepEqual({ timeout: 42 })
        )
      ).once();
    });

    it('should throw an error on found issues', async () => {
      when(mockedScan.expect(anything())).thenResolve();
      when(mockedScan.issues()).thenResolve(issues);

      const res = secScan.run(target);

      await expect(res).rejects.toThrow(IssueFound);
    });

    it('should stop scan after resolved expectation', async () => {
      when(mockedScan.expect(anything())).thenResolve();
      when(mockedScan.issues()).thenResolve([]);

      await secScan.run(target);

      verify(mockedScan.stop()).once();
    });

    it('should stop scan on any error', async () => {
      when(mockedScan.expect(anything())).thenReject();

      const res = secScan.run(target);

      await expect(res).rejects.toThrow();
      verify(mockedScan.stop()).once();
    });

    it('should report if issues are found', async () => {
      when(mockedScan.expect(anything())).thenResolve();
      when(mockedScan.issues()).thenResolve(issues);

      const res = secScan.run(target);

      await expect(res).rejects.toThrow();
      verify(mockedIssueFormatter.format(anything())).once();
    });

    it('should not report if there are not issues', async () => {
      when(mockedScan.expect(anything())).thenResolve();
      when(mockedScan.issues()).thenResolve([]);

      await secScan.run(target);

      verify(mockedIssueFormatter.format(anything())).never();
    });
  });
});
