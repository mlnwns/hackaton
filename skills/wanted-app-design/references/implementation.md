# 구현 지침

실제 프로젝트의 기술과 공통 컴포넌트를 먼저 따른다. 아래 코드는 반투명 하단 탭 바와 동작값을 옮기기 위한 시작점이다.

## Expo와 React Native

`expo-blur`와 `react-native-safe-area-context`를 사용한다.

```tsx
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";

export function FloatingTabBar({ children }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[styles.slot, { bottom: Math.max(insets.bottom, 8) }]}
    >
      <BlurView intensity={72} tint="light" style={styles.glass}>
        <View style={styles.highlight} />
        <View style={styles.items}>{children}</View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 64,
    shadowColor: "#111827",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  glass: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 28,
    backgroundColor: "rgba(248,249,252,0.62)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.60)",
  },
  highlight: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  items: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
  },
});
```

주의할 점:

- `BlurView`를 실제 스크롤 콘텐츠 위에 렌더링한다.
- 스크롤 컨테이너의 `contentContainerStyle.paddingBottom`을 104pt 정도로 둔다.
- 각 탭 항목은 `flex: 1`로 같은 너비를 차지하게 한다.
- 아이콘이 21pt여도 `Pressable`의 터치 영역은 44pt 이상으로 만든다.
- Android에서 블러 성능이 나쁘면 `rgba(248,249,252,.94)` 배경과 그림자로 대체한다.

Reanimated의 일반 스프링 시작값:

```ts
export const wantedSpring = {
  damping: 24,
  stiffness: 260,
  mass: 1,
};
```

버튼은 `onPressIn`에서 90ms 안에 0.97로 줄이고 `onPressOut`에서 스프링으로 1에 돌아오게 한다. 동작 중 입력을 막지 않는다.

## SwiftUI

```swift
HStack(spacing: 0) {
    ForEach(tabs) { tab in
        TabItem(tab: tab)
            .frame(maxWidth: .infinity)
            .frame(height: 60)
    }
}
.background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 28))
.overlay {
    RoundedRectangle(cornerRadius: 28)
        .stroke(.white.opacity(0.55), lineWidth: 0.5)
}
.shadow(color: .black.opacity(0.11), radius: 18, y: 10)
.padding(.horizontal, 16)
.padding(.bottom, 8)
```

- `safeAreaInset` 또는 아래쪽 overlay를 사용한다.
- 스크롤 콘텐츠 아래에 탭 바 높이와 안전 영역을 포함한 여백을 둔다.
- 투명도 줄이기가 켜지면 Material 대신 거의 불투명한 시스템 배경을 사용한다.

## 웹

```css
.floating-tab-bar {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: max(8px, env(safe-area-inset-bottom));
  height: 64px;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 28px;
  background: rgba(248, 249, 252, 0.74);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.12);
}

.pressable:active {
  transform: scale(0.97);
  transition: transform 90ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .floating-tab-bar,
  .sheet {
    transform: none !important;
    transition: opacity 150ms ease;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .floating-tab-bar,
  .sheet {
    background: rgba(248, 249, 252, 0.97);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

## 바텀시트 구현

- 시트 배경과 뒤 화면의 어두운 막을 서로 다른 레이어로 만든다.
- 시트가 올라올 때 배경 블러와 시트 scale `.98 → 1`을 함께 바꾼다.
- 드래그 중에는 손가락 이동을 1:1로 따른다.
- 손을 놓으면 거리뿐 아니라 속도까지 보고 닫을지 원위치로 갈지 결정한다.
- 닫히는 동안 입력을 막지 않는다. 사용자가 다시 잡으면 현재 위치부터 이어서 움직인다.
- 키보드가 나타날 수 있는 필터라면 키보드 높이와 안전 영역을 함께 반영한다.

## 성능과 검증

- 움직이는 요소에는 transform과 opacity를 우선 사용한다.
- 목록 카드 안에서 큰 블러를 반복 렌더링하지 않는다.
- iOS, Android, 작은 화면, 큰 글자에서 확인한다.
- 반투명 패널 아래에 밝은 이미지, 어두운 이미지, 글자가 있을 때 모두 읽을 수 있는지 확인한다.
- 스크롤 마지막 항목과 고정 버튼이 탭 바에 가려지지 않는지 확인한다.
- 스크린샷만 확인하지 말고 누름, 스크롤, 시트 드래그를 직접 시험한다.
