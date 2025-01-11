export const prompts = {
    hello_world: {
        description: 'Un message de bienvenue simple',
        arguments: [],
        messages: [{
            role: 'assistant',
            content: {
                type: 'text',
                text: 'Bonjour ! Je suis le serveur MCP de démonstration.'
            }
        }]
    },
    help: {
        description: 'Affiche l\'aide du serveur',
        arguments: [],
        messages: [{
            role: 'assistant',
            content: {
                type: 'text',
                text: 'Voici les commandes disponibles :\n' +
                      '- get_current_time : affiche la date et l\'heure\n' +
                      '- get_clever_apps : liste vos applications\n' +
                      '- get_clever_account : affiche les informations de votre compte\n' +
                      '- control_clever_app : contrôle une application'
            }
        }]
    }
};
