# MMM-MALList
A [MagicMirror²](https://magicmirror.builders/) module helper that shows the currently watching anime & currently reading manga of an account at [MyAnimeList](https://myanimelist.net/).

![Example](.github/AnimeMangaList.png)

## Installation
In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/NikosNtigas/MMM-MALList.git
````

Add the module to the modules array in the `config/config.js` file:
````javascript
    {
        module: "MMM-MALList"
        config: {
            username: "username",
        },
    },
````

## Configuration options
**The following properties can be configured:**

| Option                        | Description
| ----------------------------  | -----------
| `username`                    | The MAL username <br><br> **MANDATORY** <br>
| `showAnimeList`               | Show the anime list <br><br> **OPTIONAL** <br> **Possible values:** `false` or `true` <br> **Default value:** `true`
| `showMangaList`               | Show the manga list <br><br> **OPTIONAL** <br> **Possible values:** `false` or `true` <br> **Default value:** `true`
| `numOfAnime`                  | The number of anime to show <br><br> **OPTIONAL** <br> **Default value:** `infinity`
| `numOfManga`                  | The number of manga to show <br><br> **OPTIONAL** <br> **Default value:** `infinity`
| `showTitle`                   | Show the title of anime / manga list <br><br> **OPTIONAL** <br> **Possible values:** `false` or `true` <br> **Default value:** `true`
| `showType`                    | Show the type of anime / manga <br><br> **OPTIONAL** <br> **Possible values:** `false` or `true` <br> **Default value:** `true`
| `showProgress`                | Show the progress (watched / total) of anime / manga <br><br> **OPTIONAL** <br> **Possible values:** `false` or `true` <br> **Default value:** `true`
| `updateInterval`              | The time that the content update itself (Milliseconds) <br><br> **Possible values:** `1000` - `86400000` <br> **Default value:** `60000` (1 minutes)

## Config Example
````javascript
    {
        module: "MMM-MALList",
        position: "top_right",
        config: {
            username: "AlchemistKng", // the MAL account username
            showMangaList: false, // do not show currenty reading manga list
            showType: false, // do not show the type of anime or manga
            updateInterval: 600000 // update every 6 minutes
        }
    },
````

![Example](.github/NewConfigAnimeList.png)
