export enum TestType {
  AMAZON_S3_TAKEOVER = 'amazon_s3_takeover',
  BROKEN_OBJECT_PROPERTY_LEVEL_AUTHORIZATION = 'bopla',
  BROKEN_ACCESS_CONTROL = 'broken_access_control',
  BROKEN_SAML_AUTHENTICATION = 'broken_saml_auth',
  BROKEN_JWT_AUTHENTICATION = 'jwt',
  BRUTE_FORCE_LOGIN = 'brute_force_login',
  BUSINESS_CONSTRAINT_BYPASS = 'business_constraint_bypass',
  COOKIE_SECURITY = 'cookie_security',
  CROSS_SITE_REQUEST_FORGERY = 'csrf',
  CSS_INJECTION = 'css_injection',
  DATE_MANIPULATION = 'date_manipulation',
  EMAIL_INJECTION = 'email_injection',
  EXCESSIVE_DATA_EXPOSURE = 'excessive_data_exposure',
  FILE_UPLOAD = 'file_upload',
  FULL_PATH_DISCLOSURE = 'full_path_disclosure',
  GRAPHQL_INTROSPECTION = 'graphql_introspection',
  HTML_INJECTION = 'html_injection',
  HTTP_METHOD_FUZZING = 'http_method_fuzzing',
  ID_ENUMERATION = 'id_enumeration',
  IFRAME_INJECTION = 'iframe_injection',
  IMPROPER_ASSET_MANAGEMENT = 'improper_asset_management',
  INSECURE_OUTPUT_HANDLING = 'insecure_output_handling',
  LDAP_INJECTION = 'ldapi',
  LOCAL_FILE_INCLUSION = 'lfi',
  MASS_ASSIGNMENT = 'mass_assignment',
  MONGODB_INJECTION = 'nosql',
  OPEN_CLOUD_STORAGE = 'open_cloud_storage',
  EXPOSED_DATABASE_DETAILS = 'open_database',
  OS_COMMAND_INJECTION = 'osi',
  PASSWORD_RESET_POISONING = 'password_reset_poisoning',
  PROMPT_INJECTION = 'prompt_injection',
  JS_PROTOTYPE_POLLUTION = 'proto_pollution',
  REMOTE_FILE_INCLUSION = 'rfi',
  SQL_INJECTION = 'sqli',
  SECRET_TOKENS_LEAK = 'secret_tokens',
  SERVER_SIDE_JS_INJECTION = 'server_side_js_injection',
  SERVER_SIDE_REQUEST_FORGERY = 'ssrf',
  SERVER_SIDE_TEMPLATE_INJECTION = 'ssti',
  STORED_CROSS_SITE_SCRIPTING = 'stored_xss',
  UNVALIDATED_REDIRECT = 'unvalidated_redirect',
  XPATH_INJECTION = 'xpathi',
  XML_EXTERNAL_ENTITY_INJECTION = 'xxe',
  CROSS_SITE_SCRIPTING = 'xss'
}
