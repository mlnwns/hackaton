# AI 해커톤 스킬 모음

제한된 시간에 실무 과제를 해결할 때 필요한 Codex 스킬 6개입니다. 과제와 환경에 맞는 스킬만 선택해 사용하세요.

| 스킬 | 사용할 때 |
| --- | --- |
| [`hackathon-copilot`](skills/hackathon-copilot/SKILL.md) | 과제를 이해하고 담당자 질문, 핵심 설계, 구현·검증과 설명을 준비할 때 |
| [`ponytail`](skills/ponytail/SKILL.md) | 필수 범위를 빠뜨리지 않으면서 단순하게 구현할 때 |
| [`systematic-debugging`](skills/systematic-debugging/SKILL.md) | 오류를 재현하고 근본 원인을 추적할 때 |
| [`apple-design`](skills/apple-design/SKILL.md) | 제스처·애니메이션이나 Apple 스타일의 상호작용을 만들 때 |
| [`sk-hynix-web-design`](skills/sk-hynix-web-design/SKILL.md) | SK하이닉스 CI 색상과 Montage 컴포넌트로 업무용 웹을 만들 때 |
| [`mlnkorean`](skills/mlnkorean/SKILL.md) | 한국어 보고서나 화면 안내 문구를 다듬을 때 |

## 사용

시험 화면과 운영자의 최신 안내가 이 저장소보다 우선합니다. 외부 공개 저장소에서 스킬을 가져와도 되는지와 사용한 스킬의 제출 조건을 먼저 확인하세요.

과제 작업 중 Codex에 다음과 같이 요청할 수 있습니다.

```text
https://github.com/mlnwns/hackaton 의 최신 hackathon-copilot을 사용하고 싶어.
과제 안내에서 외부 스킬 사용과 제출 조건을 먼저 확인해줘.
허용된다면 스킬 폴더 전체를 과제 루트의
.agents/skills/hackathon-copilot에 설치하고 SKILL.md를 직접 읽어줘.
기존 파일이 있다면 덮어쓰지 말고 차이를 알려줘.
과제 README와 데이터가 있으면 분석하고 담당자 질문을 준비해줘.
```

스킬을 직접 읽으면 현재 작업에 적용할 수 있습니다. 자동 인식 여부는 `/skills`에서 확인하세요. 화면이 필요하면 별도로 `sk-hynix-web-design`을 선택할 수 있으며, 과제의 브랜드 요구가 우선입니다. 다른 스킬은 필요할 때만 폴더 전체를 설치하거나 해당 `SKILL.md`를 읽어 적용합니다. SK 디자인 스킬은 참고자료와 스타터를 함께 포함해야 합니다.

더 자세한 순서와 문장은 [시험 진행 가이드](시험-진행-가이드.md)를 참고하세요.

## 시험 환경에서 주의

- 시험 운영자의 최신 안내와 과제 지시가 우선합니다.
- 과제 내용·파일·결과물을 허가 없이 외부로 전송하거나 Git push하지 마세요.
- 후속 서술형에서 AI 사용이 금지된 경우 직접 답변하세요.
- 사용한 스킬과 컨텍스트의 제출 방식은 실제 과제 안내에서 확인하세요.
- 시험 환경에서 저장소 다운로드와 스킬 적용이 가능한지는 사전 체험에서 확인하세요.

## 출처

`systematic-debugging`은 [obra/superpowers](https://github.com/obra/superpowers)를 기반으로 하며 해당 폴더에 MIT 라이선스를 보존했습니다.

`sk-hynix-web-design`의 스타터는 [Montage](https://github.com/wanteddev/montage-web), [Pretendard](https://github.com/orioncactus/pretendard)와 Apache ECharts를 사용하며 관련 라이선스를 스킬에 포함합니다. 예제는 공식 SK하이닉스 디자인 시스템이나 양사의 제휴 결과가 아닙니다.
