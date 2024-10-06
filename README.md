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
  <a href="https://github.com/T1ckbase/cs2-rainbow-crosshair#readme">English</a>
  ·
  <a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/blob/main/zh-TW.md">中文</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/blob/main/v1.1.0.md">v1.1 Documentation</a>
</p>

## Features
- **Changes color based on mouse movement**
- **360 colors**
- **Adjustable speed**

## Download
<a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/releases/latest">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/T1ckbase/cs2-rainbow-crosshair/refs/heads/main/download-button-dark.svg">
    <img src="https://raw.githubusercontent.com/T1ckbase/cs2-rainbow-crosshair/refs/heads/main/download-button-light.svg" alt="Download" width="108" height="32">
  </picture>
</a>

[id1]: ## "Counter-Strike Global Offensive/game/csgo/cfg/autoexec.cfg"
## Usage
1. Place the unzipped folder into :file_folder:`Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg`
2. Add the following commands to your [autoexec.cfg][id1]
```
exec t1ckbase_rainbow_crosshair/init

// speed setting (1 ~ 30)
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
- Adjust speed `(1 ~ 30)`
```
rainbow_crosshair_speed_21
```

## Color palette preview
<img src="https://raw.githubusercontent.com/T1ckbase/cs2-rainbow-crosshair/refs/heads/main/rainbow.svg" width="80px" height="80px">

<br/>

## Old GIF
![cs2-rainbow-crosshair](https://github.com/T1ckbase/cs2-rainbow-crosshair/assets/146760065/6a01bc8a-d4c8-48ad-b6ed-f93c4a2c1b64)
