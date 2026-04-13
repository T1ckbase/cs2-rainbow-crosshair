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

- **會隨著滑鼠移動改變準星顏色**
- **可讓 HUD 顏色和準星同步變化**
- **支援多種配色方案**
- **可調整變色速度**

## 下載

<a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/releases/latest/download/cfg.zip">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/download-button-dark.svg">
    <img src="./assets/download-button-light.svg" alt="下載" width="108" height="32">
  </picture>
</a>

## 使用方式

1. 將 `t1ckbase_rainbow_crosshair` 資料夾放到：`Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg`
2. 把以下指令加入 `autoexec.cfg`

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

## 指令別名

| 指令                                                        | 說明                              |
| ----------------------------------------------------------- | --------------------------------- |
| `rainbow_crosshair_on`                                      | 開啟彩虹準星。                    |
| `rainbow_crosshair_off`                                     | 關閉彩虹準星。                    |
| `rainbow_crosshair_toggle`                                  | 切換彩虹準星的開關狀態。          |
| `rainbow_crosshair_hud_sync_on`                             | 讓 HUD 顏色跟著準星顏色同步變化。 |
| `rainbow_crosshair_hud_sync_off`                            | 停止同步 HUD 顏色。               |
| `rainbow_crosshair_load_hsl`                                | 載入 `hsl` 配色。                 |
| `rainbow_crosshair_load_oklch`                              | 載入 `oklch` 配色。               |
| `rainbow_crosshair_speed_1` 到 `rainbow_crosshair_speed_30` | 設定變色速度。                    |

## 配色預覽

<div>
  <img src="./assets/oklch.svg" width="90px" height="90px" alt="oklch">
  <img src="./assets/hsl.svg" width="90px" height="90px" alt="hsl">
</div>

<br/>

[觀看 CS2 彩虹準星預覽](https://github.com/user-attachments/assets/0f0c74d4-9cc3-4000-8a3c-e960f30d1234)
