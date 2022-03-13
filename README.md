# Hall of Fame Bot for discord v13

Write !!help to see the usage of all commands.

You can bind this Bot to a selected channel to create a Hall of Fame there.
Once a Hall of Fame has been created you can start voting on messages with the ⭐ emoji.
If enough people react on a message with that emoji it will be posted in the Hall of Fame channel.
The amount of ⭐ reactions needed can be changed.

To make the Bot work you need a config.json file in the root directory with following structure:

```
{
    "prefix": "!!",
    "reactions_needed": 2,
    "admins": [
        "123456789012345678"
    ]
}
```

and a storage folder with a backup.json and storage.json file in it.
backup.json structure:
```
{
  "hof_posts": [
    
  ]
}
```

storage.json structure:
```
{
  "currentlyTracking": [
    
  ]
}
```

The storage.json file is needed so the bot knows which messages in discord it should track for the Hall of Fame.
The backup.json file isn't actually needed but due to the nature of the code the bot won't work without it. You could remove all require for this file if you don't want a backup file.

You need to have atleast one role in the admin array or else most commands won't work.
Either that or you have to change the adminOnly boolean in all commands to false, so everybody can use all commands.
You can add or remove a role to/from the admin group by right clicking a role and copying the ID of that role and using the !!addadmin [role id] or !!rmadmin [role id] command. Note that you can only copy ID's when Developer Mode is activated in your discord settings.
