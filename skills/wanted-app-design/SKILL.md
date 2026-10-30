---
name: wanted-app-design
description: "Design, build, or review a mobile app using the observed visual grammar of the Wanted iOS app: restrained white surfaces, clear information hierarchy, compact content cards, translucent floating navigation, consistent icon families, and quiet physical motion. Use for a native mobile app or explicitly mobile request for 원티드 앱 스타일, a Wanted-like app UI, or its floating bottom bar, spacing, cards, icons, or interactions. For website or desktop requests use wanted-web-design when available. Do not use for job searching, applications, or general questions about Wanted as a company."
---

# 원티드 앱 디자인

원티드 iOS 앱에서 관찰한 규칙을 사용해 새로운 모바일 앱을 설계하거나 구현한다. 특정 화면과 브랜드 에셋을 복제하지 않고, 정보의 순서·간격·재질·아이콘·동작을 새 서비스의 목적에 맞게 옮긴다.

## 필수 참고 자료

모든 작업에서 [references/design-system.md](references/design-system.md)를 읽는다. 이 문서에 색상, 글자, 여백, 카드, 탭 바, 바텀시트, 아이콘, 동작 규칙이 있다.

코드를 작성하거나 구현값을 정할 때만 [references/implementation.md](references/implementation.md)를 추가로 읽는다. Expo·React Native, SwiftUI, 웹 구현 예시와 접근성 대체 방식을 담고 있다.

도구가 디자인 토큰 JSON을 받을 수 있거나 사용자가 토큰 파일을 요청하면 [references/tokens.json](references/tokens.json)을 사용한다.

## 작업 원칙

### 새 화면을 설계할 때

1. 사용자가 가장 먼저 봐야 하는 정보와 가장 중요한 행동을 정한다.
2. 화면 좌우 20~24pt 여백과 4pt 간격 단위로 골격을 만든다.
3. 제목, 카드 제목, 본문, 부가 정보의 네 단계를 먼저 맞춘다.
4. 파란색은 선택 상태와 가장 중요한 행동에만 쓴다.
5. 카드 이미지의 비율과 반지름을 통일한다.
6. 일반 카드에는 진한 그림자를 넣지 않는다.
7. 하단 탭 바나 바텀시트가 필요할 때만 반투명 재질을 쓴다.
8. 마지막에 컬러 기능 아이콘과 짧은 동작을 더한다.

### 기존 앱을 수정할 때

- 현재 정보 구조와 사용자의 브랜드 색을 먼저 보존한다.
- 원티드처럼 보이게 한다는 이유로 서비스 이름, 문구, 로고, 전용 아이콘을 복제하지 않는다.
- 기존 디자인 토큰이 있으면 새 값을 병렬로 만들지 말고 의미가 같은 토큰에 매핑한다.
- 화면 하나만 고쳐도 공통 컴포넌트의 다른 사용처를 확인한다.
- 사용자가 구현을 요청했다면 눈에 보이는 스타일만 바꾸지 말고 안전 영역, 스크롤 아래 여백, 터치 영역, 동작 줄이기 설정까지 확인한다.

### 디자인을 검토할 때

다음 순서로 문제를 찾고, 큰 문제부터 설명한다.

1. 정보의 우선순위가 글자 크기와 색으로 드러나는가?
2. 화면 좌우 여백과 섹션 간격이 일정한가?
3. 파란색과 그림자를 필요 이상으로 쓰지 않았는가?
4. 하단 바 뒤로 콘텐츠가 실제로 지나가며 블러가 보이는가?
5. 시스템 아이콘과 컬러 기능 아이콘의 그림체가 구분되는가?
6. 버튼이 손가락이 닿는 순간 반응하는가?
7. 큰 글자, 동작 줄이기, 투명도 줄이기 설정에서도 사용할 수 있는가?

## 반드시 지킬 특징

- 흰 화면과 또렷한 제목을 기본으로 삼는다.
- 일반 콘텐츠는 경계선 또는 아주 약한 그림자 중 하나로만 구분한다.
- 콘텐츠 카드는 8~12pt, 그룹 카드는 12~16pt 반지름을 쓴다.
- 모든 요소를 알약 모양으로 만들지 않는다.
- 하단 탭 바는 화면 가장자리에서 떨어진 60~64pt 높이의 반투명 패널로 만든다.
- 스크롤 콘텐츠는 하단 탭 바 아래로 지나가되, 마지막 항목이 가려지지 않도록 96~112pt 아래 여백을 둔다.
- 내비게이션 아이콘은 단색 선형, 주요 기능 아이콘은 단순한 2~3색 면으로 그린다.
- 터치 영역은 최소 44×44pt로 만든다.
- 작은 동작은 160~220ms 안에 끝내고 과장된 튕김을 피한다.

## 결과물

사용자 요청에 맞춰 필요한 결과만 만든다.

- 디자인 명세: 화면 구조, 컴포넌트 상태, 토큰, 동작과 접근성
- 코드: 기존 프로젝트의 기술과 구조를 따르는 실제 컴포넌트
- 검토: 문제의 위치, 사용자에게 미치는 영향, 구체적인 수정값
- 아이콘 지침: 캔버스, 실루엣, 색 조합, 선과 면 규칙

추정한 값은 실제 원티드 내부 토큰이라고 표현하지 않는다. 화면 관찰에서 얻은 추천값임을 밝힌다.
