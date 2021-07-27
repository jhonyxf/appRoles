# appRoles
Aplicação IONIC com Guard e Directives

# Pages for testing
ionic g page pages/login
ionic g page pages/secret
 
# Handle the current user
ionic g service services/auth
 
ionic g module directives/SharedDirectives --flat

ionic g directive directives/hasPermission
ionic g directive directives/disableRole
 
# Guard to protect pages
ionic g guard guards/auth --implements CanActivate
