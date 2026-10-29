# AI 해커톤 스킬 모음

제한된 시간에 실무 과제를 구현할 때 참고할 수 있는 Codex 스킬 6개입니다. 필요한 스킬만 선택해 사용하세요.

| 스킬 | 사용할 때 |
| --- | --- |
| [`ponytail`](skills/ponytail/SKILL.md) | 기존 코드를 먼저 확인하고, 필요한 범위를 빠뜨리지 않으면서 단순하게 구현할 때 |
| [`react-best-practices`](skills/react-best-practices/SKILL.md) | React·Next.js 구현이나 검토가 필요한 경우 |
| [`pick-ui-library`](skills/pick-ui-library/SKILL.md) | 차트나 UI 컴포넌트처럼 라이브러리 선택이 필요한 경우 |
| [`emil-design-eng`](skills/emil-design-eng/SKILL.md) | 웹 UI의 상호작용, 접근성과 시각적 완성도를 다듬을 때 |
| [`wanted-app-design`](skills/wanted-app-design/SKILL.md) | Wanted 앱 같은 차분한 모바일 UI가 필요한 경우 |
| [`apple-design`](skills/apple-design/SKILL.md) | 터치·드래그·시트 등 제스처 중심 UI가 실제로 필요한 경우 |

## 사용

공개 저장소 다운로드가 허용된 환경에서 다음 명령을 실행합니다.

```bash
git clone https://github.com/mlnwns/ai-hackathon-skills.git
```

그다음 제공된 Codex에 필요한 스킬 파일을 읽고 해당 작업에 적용하도록 요청합니다. 예를 들어:

```text
ai-hackathon-skills/skills/ponytail/SKILL.md를 읽고,
과제의 필수 조건을 먼저 파악한 뒤 작은 단위로 구현해줘.
각 단계에서 실제로 확인한 결과와 남은 한계를 알려줘.
```

React가 필요할 때는 `skills/react-best-practices/SKILL.md`, 라이브러리 선택이 필요할 때는 `skills/pick-ui-library/SKILL.md`를 지정할 수 있습니다. `react-best-practices`의 `rules/`와 `AGENTS.md`는 스킬이 참조하는 자료이므로 함께 유지합니다.

화면이 필요하다면 `emil-design-eng`을 고려하세요. 모바일 화면의 스타일이 맞는 경우에만 `wanted-app-design`을, 제스처가 과제의 핵심인 경우에만 `apple-design`을 사용하세요. 한꺼번에 적용하기보다 과제에 필요한 스킬 하나를 선택하고, 필수 기능과 검증을 먼저 완성하세요. `wanted-app-design`의 `references/`는 스킬과 함께 유지합니다.

## 시험 환경에서 주의

- 시험 운영자의 최신 안내와 과제 지시가 이 저장소의 스킬보다 우선합니다.
- 공개 자료 다운로드가 허용돼도 과제 내용·파일·결과물을 외부에 전송하거나 Git Push하지 마세요.
- 개인 파일 업로드와 별도 AI 모델 연결은 시험 안내에 따라 제한될 수 있습니다.
- 후속 서술형에서 AI 사용이 금지된 경우 스킬도 사용하지 말고 본인이 직접 답변하세요.
- 이 저장소는 브라우저 자동 조작 도구를 포함하지 않습니다. 제공된 미리보기에서 직접 동작을 확인하세요.
- 시험 환경에서 저장소 다운로드와 스킬 적용이 가능한지는 사전 체험에서 확인하세요.

## 출처

`react-best-practices`는 Vercel Engineering의 [공개 스킬](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices)을 기반으로 하며 스킬 메타데이터에 MIT 라이선스가 표시되어 있습니다. 스킬별 안내와 라이선스 표기는 각 `SKILL.md`를 확인하세요.
