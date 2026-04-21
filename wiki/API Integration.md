## How to Integrate Custom Menu Items

The module calls the hook "dnd-easy-reference.prepareConfigMenuItems" and passes an object with menu configuration values.

[Menu Config Types](<https://github.com/kgar/dnd-easy-reference/blob/main/scripts/_types.mjs>)

> [!IMPORTANT]
> Your menu config key must be unique, or you will override an existing Easy Reference menu option.
> Submenu keys must be unique from each other, but they will automatically be made unique from other submenus' items.

Example - adding a top-level menu item that does something:
```js
Hooks.once("dnd-easy-reference.prepareConfigMenuItems", (configs) => {
    configs['myCustomMenuConfig'] = {
        title: "My Custom Menu Config",
        onMenuItemClick: async (menu) => {
            console.log('Check out the ProseMirrorMenu', menu);
            ui.notifications.info('Hello, world!');
        }
    }
});
```

Example - adding a menu with submenu items:
```js
Hooks.once("dnd-easy-reference.prepareConfigMenuItems", (configs) => {
    const api = CONFIG.DND_EASY_REFERENCE.api;
    
    configs['myImportantActors'] = {
        title: "Important Actors",
        items: [
            {
                key: 'the-party',
                title: 'Reference - The Party',
                onMenuItemClick: async (menu) => {
                    const actor = game.actors.getName('Starter Heroes');
                    api.insertText(`@UUID[${actor.uuid}{Our Party}]`)
                }
            },
            {
                key: 'the-villain',
                title: 'Reference - The Villain',
                onMenuItemClick: async (menu) => {
                    const { uuid, name } = await fromUuid('Compendium.dnd5e.monsters.Actor.bfh29vIEoGzI240e');
                    api.insertText(`@UUID[${uuid}{name}]`)
                }
            }
        ]
    }
});
```

Example - adding a menu with submenu items from a dynamic data source like CONFIG.DND5E:
```js
Hooks.once("dnd-easy-reference.prepareConfigMenuItems", (configs) => {
    // Get actor sizes and wired up some behaviors.
    const items = Object.entries(CONFIG.DND5E.actorSizes).map(([key, value]) => ({
        key,
        title: `Reference Most Encumbered ${value.label} Character`,
        onMenuItemClick: async (menu) => {
            const api = CONFIG.DND_EASY_REFERENCE.api;
            // ok, we are pretending I implemented this code
            const { uuid, name } = getMostEncumberedCharacterBySize(key);
            api.insertText(`@UUID[${uuid}{name}]`)
        }
    }));

    configs['myCustomMenuWithSubMenusConfig'] = {
        title: "My Nested Menu",
        items: items
    }
});
```