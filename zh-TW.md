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

## 功能

- **根據滑鼠移動變換顏色**
- **多組配色**
- **可調整變色速度**

## 下載

<a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/releases/latest/download/cfg.zip">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/download-button-dark.svg">
    <img src="./assets/download-button-light.svg" alt="下載" width="108" height="32">
  </picture>
</a>

## 使用方式

1. 將 `t1ckbase_rainbow_crosshair` 資料夾放到: `Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg`
2. 添加以下指令到你的 `autoexec.cfg`

```
exec t1ckbase_rainbow_crosshair/init

// 載入配色
rainbow_crosshair_load_oklch
// rainbow_crosshair_load_hsl

// 設定速度 (1 ~ 30)
rainbow_crosshair_speed_10

rainbow_crosshair_enable
// rainbow_crosshair_disable
// rainbow_crosshair_toggle
```

## 指令別名

- 啟用彩虹準星

```
rainbow_crosshair_enable
```

- 關閉彩虹準星

```
rainbow_crosshair_disable
```

- 切換彩虹準星開關

```
rainbow_crosshair_toggle
```

- 載入配色 (`oklch`, `hsl`)

```
rainbow_crosshair_load_oklch
```

- 調整變色速度 `1 ~ 30`

```
rainbow_crosshair_speed_10
```

## 配色預覽

<div>
  <img src="./assets/oklch.svg" width="90px" height="90px" alt="oklch">
  <img src="./assets/hsl.svg" width="90px" height="90px" alt="hsl">
</div>

<br/>

![cs2-rainbow-crosshair](https://github.com/T1ckbase/cs2-rainbow-crosshair/assets/146760065/6a01bc8a-d4c8-48ad-b6ed-f93c4a2c1b64)
