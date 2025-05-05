[](#readme)

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

- **Changes color based on mouse movement**
- **Multiple color palettes**
- **Adjustable speed**

## Download

<a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/releases/latest/download/t1ckbase_rainbow_crosshair.zip">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/download-button-dark.svg">
    <img src="./assets/download-button-light.svg" alt="Download" width="108" height="32">
  </picture>
</a>

## Usage

1. Place the `t1ckbase_rainbow_crosshair` folder into: `Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg`
2. Add the following commands to your `autoexec.cfg`

```
exec t1ckbase_rainbow_crosshair/init

// Load color palette
rainbow_crosshair_load_oklch
// rainbow_crosshair_load_hsl

// Set color change speed [1-30]
rainbow_crosshair_speed_10

rainbow_crosshair_enable
// rainbow_crosshair_disable
// rainbow_crosshair_toggle
```

## Aliases

- Enable rainbow crosshair

```
rainbow_crosshair_enable
```

- Disable rainbow crosshair

```
rainbow_crosshair_disable
```

- Toggle rainbow crosshair

```
rainbow_crosshair_toggle
```

- Load color palette (`oklch`, `hsl`)

```
rainbow_crosshair_load_oklch
```

- Adjust speed `[1-30]`

```
rainbow_crosshair_speed_10
```

## Color palettes preview

<div>
  <img src="./assets/oklch.svg" width="90px" height="90px" alt="oklch">
  <img src="./assets/hsl.svg" width="90px" height="90px" alt="hsl">
</div>

<br/>

![cs2-rainbow-crosshair](https://github.com/T1ckbase/cs2-rainbow-crosshair/assets/146760065/6a01bc8a-d4c8-48ad-b6ed-f93c4a2c1b64)
