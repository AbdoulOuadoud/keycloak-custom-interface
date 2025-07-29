import { CustomTemplateProps } from './types'

const Template = <T extends string>(props: CustomTemplateProps<T>) => {
  const { 
    children, 
    kcContext, 
    i18n,
    displayMessage = true,
    displayRequiredFields = false,
    infoNode,
    socialProvidersNode,
    documentTitle,
    bodyClassName = "",
    displayInfo = false
  } = props

  const { msg } = i18n
  const { url, message, isAppInitiatedAction, scripts } = kcContext

  const title = documentTitle || i18n.msgStr("loginTitle", kcContext.realm.displayName)

  return (
    <>
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          
          <title>{title}</title>
          <link rel="icon" href={`${url.resourcesPath}/favicon.ico`} />
          
          {/* Scripts Keycloak essentiels */}
          {scripts !== undefined &&
            scripts.map((script, i) => (
              <script key={i} src={script} type="text/javascript" />
            ))}
        </head>
        
        <body className={bodyClassName}>
          <div className="kc-container">
            <div className="kc-container-wrapper">
              
              {/* Info section */}
              {displayInfo && infoNode && (
                <div id="kc-info" className="kc-info">
                  <div id="kc-info-wrapper" className="kc-info-wrapper">
                    {infoNode}
                  </div>
                </div>
              )}

              {/* Main content */}
              <div id="kc-content">
                <div id="kc-content-wrapper">
                  
                  {/* Messages d'erreur/succès globaux */}
                  {displayMessage && message && (message.type !== 'warning' || !isAppInitiatedAction) && (
                    <div className={`alert alert-${message.type}`}>
                      <span className="kc-feedback-text" dangerouslySetInnerHTML={{ __html: message.summary }} />
                    </div>
                  )}

                  {/* Required fields info */}
                  {displayRequiredFields && (
                    <div className="kc-required">
                      {msg("requiredFields")}
                    </div>
                  )}

                  {/* Main form content */}
                  <div id="kc-form">
                    <div id="kc-form-wrapper">
                      {children}
                    </div>
                  </div>

                  {/* Social providers */}
                  {socialProvidersNode && (
                    <div id="kc-social-providers">
                      <div id="kc-social-providers-wrapper">
                        {socialProvidersNode}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Script pour s'assurer que les formulaires sont correctement soumis */}
          <script 
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                // Assurer que les formulaires sont correctement soumis
                window.addEventListener('DOMContentLoaded', function() {
                  const forms = document.querySelectorAll('form[action*="loginAction"]');
                  forms.forEach(function(form) {
                    form.addEventListener('submit', function(e) {
                      // S'assurer que tous les champs cachés nécessaires sont présents
                      const requiredFields = ['credentialId'];
                      requiredFields.forEach(function(fieldName) {
                        const existing = form.querySelector('input[name="' + fieldName + '"]');
                        if (!existing) {
                          const input = document.createElement('input');
                          input.type = 'hidden';
                          input.name = fieldName;
                          input.value = '';
                          form.appendChild(input);
                        }
                      });
                    });
                  });
                });
              `
            }}
          />
        </body>
      </html>
    </>
  )
}

export { Template }