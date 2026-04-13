<div id="toc">
  <ul align="center" style="list-style: none">
    <summary>
      <h1>
        CS2 Rainbow Crosshair
      </h1>
    </summary>
  </ul>
</div>
<p align="center">
  <a href="/#readme">English</a>
  ·
  <a href="/zh-TW.md">中文</a>
</p>

## Features

- **Changes the crosshair color based on mouse movement**
- **Can sync the HUD color with the crosshair**
- **Supports multiple color palettes**
- **Allows adjustable speed**

## Download

<a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/releases/latest/download/cfg.zip">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/download-button-dark.svg">
    <img src="./assets/download-button-light.svg" alt="Download" width="108" height="32">
  </picture>
</a>

## Usage

1. Place the `t1ckbase_rainbow_crosshair` folder in: `Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg`
2. Add the following commands to your `autoexec.cfg`

```
exec t1ckbase_rainbow_crosshair/init

rainbow_crosshair_load_hsl
// rainbow_crosshair_load_oklch

rainbow_crosshair_speed_10

// rainbow_crosshair_hud_sync_on
rainbow_crosshair_hud_sync_off

rainbow_crosshair_on
// rainbow_crosshair_off
// rainbow_crosshair_toggle
```

## Aliases

| Command                                                     | Description                                  |
| ----------------------------------------------------------- | -------------------------------------------- |
| `rainbow_crosshair_on`                                      | Turn the rainbow crosshair on.               |
| `rainbow_crosshair_off`                                     | Turn the rainbow crosshair off.              |
| `rainbow_crosshair_toggle`                                  | Toggle the rainbow crosshair on or off.      |
| `rainbow_crosshair_hud_sync_on`                             | Sync the HUD color with the crosshair color. |
| `rainbow_crosshair_hud_sync_off`                            | Stop syncing the HUD color.                  |
| `rainbow_crosshair_load_hsl`                                | Load the `hsl` palette.                      |
| `rainbow_crosshair_load_oklch`                              | Load the `oklch` palette.                    |
| `rainbow_crosshair_speed_1` to `rainbow_crosshair_speed_30` | Set the color change speed.                  |

## Color palettes preview

<div>
  <img src="./assets/oklch.svg" width="90px" height="90px" alt="oklch">
  <img src="./assets/hsl.svg" width="90px" height="90px" alt="hsl">
</div>

<br/>

![cs2-rainbow-crosshair](https://github.com/T1ckbase/cs2-rainbow-crosshair/assets/146760065/6a01bc8a-d4c8-48ad-b6ed-f93c4a2c1b64)
