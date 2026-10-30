# AI 해커톤 스킬 모음

제한된 시간에 실무 과제를 구현할 때 참고할 수 있는 Codex 스킬 14개입니다. 필요한 스킬만 선택해 사용하세요.

| 스킬 | 사용할 때 |
| --- | --- |
| [`hackathon-workflow`](skills/hackathon-workflow/SKILL.md) | 과제 파악부터 실무자 질문, 구현·검증, 제출 준비까지 전체 흐름을 잡을 때 |
| [`ponytail`](skills/ponytail/SKILL.md) | 기존 코드를 먼저 확인하고, 필요한 범위를 빠뜨리지 않으면서 단순하게 구현할 때 |
| [`systematic-debugging`](skills/systematic-debugging/SKILL.md) | 오류를 재현하고 원인을 추적할 때 |
| [`verification-before-completion`](skills/verification-before-completion/SKILL.md) | 완료라고 말하기 전 실제 결과를 검증할 때 |
| [`react-best-practices`](skills/react-best-practices/SKILL.md) | React·Next.js 구현이나 검토가 필요한 경우 |
| [`react-native-skills`](skills/react-native-skills/SKILL.md) | React Native·Expo 앱을 구현하거나 검토할 때 |
| [`composition-patterns`](skills/composition-patterns/SKILL.md) | 복잡한 React 컴포넌트의 구조를 정리할 필요가 있을 때 |
| [`pick-ui-library`](skills/pick-ui-library/SKILL.md) | 차트나 UI 컴포넌트처럼 라이브러리 선택이 필요한 경우 |
| [`emil-design-eng`](skills/emil-design-eng/SKILL.md) | 웹 UI의 상호작용, 접근성과 시각적 완성도를 다듬을 때 |
| [`wanted-web-design`](skills/wanted-web-design/SKILL.md) | 공식 Montage 웹 54종·유틸리티 30종 + PC 실측: 검색·필터·폼·표·상세·대시보드를 일관되게 조합할 때 |
| [`wanted-app-design`](skills/wanted-app-design/SKILL.md) | Wanted 앱 같은 차분한 모바일 UI가 필요한 경우 |
| [`apple-design`](skills/apple-design/SKILL.md) | 터치·드래그·시트 등 제스처 중심 UI가 실제로 필요한 경우 |
| [`mlnkorean`](skills/mlnkorean/SKILL.md) | 과제 풀이 중 한국어 보고서·화면 안내 문장을 다듬을 때 |
| [`humanize-korean`](skills/humanize-korean/SKILL.md) | 과제 풀이 중 짧은 한국어 설명문에서 어색한 번역투를 점검할 때 |

## 사용

공개 저장소 다운로드가 허용된 환경에서 다음 명령을 실행합니다.

```bash
git clone https://github.com/mlnwns/hackaton.git
```

그다음 제공된 Codex에 필요한 스킬 파일을 읽고 해당 작업에 적용하도록 요청합니다. 예를 들어:

```text
hackaton/skills/ponytail/SKILL.md를 읽고,
과제의 필수 조건을 먼저 파악한 뒤 작은 단위로 구현해줘.
각 단계에서 실제로 확인한 결과와 남은 한계를 알려줘.
```

React가 필요할 때는 `skills/react-best-practices/SKILL.md`, 라이브러리 선택이 필요할 때는 `skills/pick-ui-library/SKILL.md`를 지정할 수 있습니다. `react-best-practices`의 `rules/`와 `AGENTS.md`는 스킬이 참조하는 자료이므로 함께 유지합니다.

처음 과제를 받았다면 `skills/hackathon-workflow/SKILL.md`로 요구사항과 확인할 질문을 정리하고, 필요한 구현·디자인 스킬을 추가로 선택하세요. 실무자 답변과 제출 조건은 실제 과제 안내로 확인해야 합니다.

React Native·Expo를 사용하는 과제라면 `react-native-skills`를 참고하세요. `composition-patterns`는 복잡한 컴포넌트 구조가 실제로 문제가 되는 경우에만 선택하고, 단순한 과제에 구조를 추가하지 마세요. 기존 기술과 설치된 의존성을 우선합니다.

원티드 스타일로 웹을 만들 때는 `wanted-web-design`, 네이티브 모바일 앱을 만들 때는 `wanted-app-design`을 사용하세요. 주제에 맞는 콘텐츠와 기능으로 구성하며 원티드의 로고·이미지·채용 콘텐츠를 복제하지 않습니다. 플랫폼을 지정하지 않은 새 원티드 스타일 요청은 웹을 기본으로 하되 기존 프로젝트의 플랫폼을 따릅니다.

`wanted-web-design`에는 공식 Montage의 [웹 컴포넌트 54종 선택표](skills/wanted-web-design/references/montage-components.md), [화면 조합 레시피](skills/wanted-web-design/references/montage-composition.md), [Foundations·웹 유틸리티 30종](skills/wanted-web-design/references/montage-foundations-utilities.md)이 있습니다. 2026-10-31 기준 Design·Web 문서를 검토해 실제 React API, 슬롯, 선택 기준과 상태 처리를 연결했습니다. 필요한 흐름만 읽어 적용하며, 전 컴포넌트의 모든 상태를 브라우저에서 검증했다는 뜻은 아닙니다.

```text
hackaton/skills/wanted-web-design/SKILL.md를 읽고,
[주제와 핵심 기능]을 Montage 스타일 PC 웹으로 만들어줘.
필요한 컴포넌트와 조합 레시피를 골라 폰트·밀도·슬롯을 맞추고,
필터 적용/취소, 입력 검증, 로딩·빈 결과·오류까지 실제 동작하게 해줘.
```

오류가 생기면 `systematic-debugging`, 동작 확인에는 `verification-before-completion`을 사용할 수 있습니다. 과제의 필수 조건, 시간, 허용된 도구와 제출 규칙이 이 스킬보다 우선입니다.

화면이 필요하다면 `emil-design-eng`을 고려하세요. 모바일 화면의 스타일이 맞는 경우에만 `wanted-app-design`을, 제스처가 과제의 핵심인 경우에만 `apple-design`을 사용하세요. 한꺼번에 적용하기보다 과제에 필요한 스킬 하나를 선택하고, 필수 기능과 검증을 먼저 완성하세요. `wanted-app-design`의 `references/`는 스킬과 함께 유지합니다.

한국어 문서를 다듬을 때는 `mlnkorean` 또는 `humanize-korean` 중 하나만 선택하세요. 실제 구현·수치·불확실성과 검증 범위를 임의로 바꾸지 않도록 요청하고 결과를 직접 대조하세요. `humanize-korean`은 별도 `_workspace/` 결과 파일을 만들 수 있으므로 제출 미리보기에서 제출 대상과 필수 파일을 확인하세요. `mlnkorean`은 개인 말투 샘플이 없으면 기본 문체를 사용합니다. 이 저장소에는 개인 업무 메시지 샘플을 포함하지 않습니다.

## 시험 환경에서 주의

- 시험 운영자의 최신 안내와 과제 지시가 이 저장소의 스킬보다 우선합니다.
- 공개 자료 다운로드가 허용돼도 과제 내용·파일·결과물을 외부에 전송하거나 Git Push하지 마세요.
- 개인 파일 업로드와 별도 AI 모델 연결은 시험 안내에 따라 제한될 수 있습니다.
- 후속 서술형에서 AI 사용이 금지된 경우 스킬도 사용하지 말고 본인이 직접 답변하세요.
- 이 저장소는 브라우저 자동 조작 도구를 포함하지 않습니다. 제공된 미리보기에서 직접 동작을 확인하세요.
- 시험 환경에서 저장소 다운로드와 스킬 적용이 가능한지는 사전 체험에서 확인하세요.

## 출처

`react-best-practices`, `react-native-skills`, `composition-patterns`는 Vercel Engineering의 [공개 스킬 모음](https://github.com/vercel-labs/agent-skills)을 기반으로 하며 각 스킬 메타데이터에 MIT 라이선스가 표시되어 있습니다. `systematic-debugging`과 `verification-before-completion`은 [obra/superpowers](https://github.com/obra/superpowers)에서 가져왔으며 각 폴더의 MIT 라이선스를 보존했습니다. `systematic-debugging`에서 외부 플러그인 스킬을 필수로 호출하던 두 지침을 이 저장소에서 독립적으로 사용할 수 있도록 수정했습니다. 스킬별 안내와 라이선스 표기는 각 폴더를 확인하세요.

`wanted-web-design/assets`에는 독립적으로 작성한 재사용 CSS와 [Pretendard](https://github.com/orioncactus/pretendard) Variable 폰트가 포함됩니다. 폰트의 SIL Open Font License는 같은 폴더의 `OFL.txt`에 보존되어 있습니다. `assets/react-starter`에는 공식 [Montage](https://github.com/wanteddev/montage-web) 4.1.5를 사용하는 표·다중 필터·입력 검증·상세·진행 상태 예제가 있습니다. `npm ci && npm run build`로 실행용 HTML을 만들 수 있습니다. Montage의 MIT 라이선스도 포함합니다. 공식 라이브러리를 활용하지만 이 스킬 자체는 원티드의 공식 스킬이나 제휴 제품이 아닙니다.

### 데이터 대시보드

`wanted-web-design`은 [대시보드 배치](skills/wanted-web-design/references/dashboard-patterns.md), [차트 선택·테마](skills/wanted-web-design/references/chart-recipes.md), [지표·집계·데이터 계약](skills/wanted-web-design/references/data-contracts.md)을 포함합니다. 공식 Montage UI와 독립적으로 만든 ECharts 테마를 조합하며, 원티드 공식 차트나 실제 기업 데이터로 소개하지 않습니다.

`skills/wanted-web-design/assets/react-starter`에서 `npm ci && npm test && npm run build`를 실행하면 `dist/dashboard.html`에 6종 차트·필터·검사 기록·CSV·상태 예제를 볼 수 있습니다. 공개 레포에는 원본 소스와 lockfile을 포함하며 `node_modules`·빌드 결과·Playwright는 포함하지 않습니다.
