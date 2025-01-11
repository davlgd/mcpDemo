import { getCleverAccount, getCleverApps, controlCleverApp, checkCleverCli } from './clever-tools-mcp.js';

export const tools = {
    get_current_time: {
        description: 'Retourne la date et l\'heure actuelles',
        handler: async () => new Date().toLocaleString(),
        schema: {
            type: 'object',
            properties: {},
            required: []
        }
    },

    get_clever_apps: {
        description: 'Retourne le nombre d\'applications sur Clever Cloud',
        handler: async () => {
            if (!await checkCleverCli()) throw new Error('Clever Tools non disponible');
            const apps = await getCleverApps();
            return apps.length > 0
                ? `Vos ${apps.length} applications Clever Cloud :\n${apps.map(app =>
                    `- ${app.name} (${app.instance.type}, ${app.id}, ${app.vhosts[0].fqdn})`).join('\n')}`
                : "Vous n'avez aucune application sur Clever Cloud.";
        },
        schema: {
            type: 'object',
            properties: {},
            required: []
        }
    },

    get_clever_account: {
        description: 'Affiche les informations de votre compte Clever Cloud',
        handler: async () => {
            if (!await checkCleverCli()) {
                return "Clever Tools n'est pas installé. Pour l'installer:\nnpm i -g clever-tools\nclever login";
            }
            const account = await getCleverAccount();
            return `Compte Clever Cloud de ${account.name}\n` +
                   `Email : ${account.email}\n` +
                   `Pays : ${account.country}\n` +
                   `Langue : ${account.lang}\n` +
                   `Date de création : ${new Date(account.creationDate).toLocaleDateString()}`;
        },
        schema: {
            type: 'object',
            properties: {},
            required: []
        }
    },

    control_clever_app: {
        description: 'Contrôle une application (restart uniquement)',
        handler: async ({ appId, action }) => {
            if (!await checkCleverCli()) throw new Error('Clever CLI non disponible');
            await controlCleverApp(appId, action);
            return `Application ${appId} : action ${action} effectuée avec succès`;
        },
        schema: {
            type: 'object',
            properties: {
                appId: { type: 'string' },
                action: { type: 'string', enum: ['restart'] }
            },
            required: ['appId', 'action']
        }
    }
};
