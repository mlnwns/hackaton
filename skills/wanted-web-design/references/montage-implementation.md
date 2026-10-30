# 공식 Montage로 구현

원본: [wanteddev/montage-web](https://github.com/wanteddev/montage-web), [공식 문서](https://montage.wanted.co.kr). 2026-10-31 확인한 npm 버전은 **4.1.5**. 이전 자료의 `@wanteddev/wds`와 현재 `@montage-ui/*` API를 혼용하지 않는다.

## 도입 경로

기존 React 프로젝트: 필요한 컴포넌트를 현재 구조에 통합한다. 새 React 프로젝트: 이 스킬의 [react-starter](../assets/react-starter)에서 필요한 화면/컴포넌트만 가져올 수 있다. 정적 HTML 프로젝트에 원티드 스타일을 적용한다는 이유만으로 전체 React 마이그레이션을 하지 않는다.

```sh
npm install --save-exact @montage-ui/core@4.1.5 @montage-ui/icon@4.1.5
```

같이 설치하는 `@montage-ui/*`의 버전을 맞춘다. React/React DOM은 기존 프로젝트와 peer dependency 호환을 확인한다. 스킬에 동봉한 starter는 lockfile을 포함하며 `npm ci && npm run build`로 `dist/index.html` 생성. 미리 빌드한 데모는 파일로 열 수 있고, 수정 시 Node가 필요하다.

```jsx
import { ThemeProvider, Select, Option } from '@montage-ui/core';
import '@montage-ui/core/global.css';
// Pretendard @font-face는 별도로 실제 로드한다.
<ThemeProvider>
  <Select aria-label="담당 구역" value={area} onChange={setArea} width="100%">
    <Option value="1구역">1구역</Option>
    <Option value="2구역">2구역</Option>
  </Select>
</ThemeProvider>
```

실제 starter는 `assets/react-starter/src/app.jsx`에 목록/필터, 상세/아코디언, 입력/검증, 진행/설정 네 흐름을 담는다. `src/style.css`는 앱 레이아웃만 조정하며 공식 컴포넌트 내부 스타일을 무조건 덮어쓰지 않는다. 가상 설비 데이터·업무 흐름은 스킬이 만든 응용이며 원티드 서비스 원본이 아니다. 저장은 메모리만 사용하므로 새로고침하면 초기화된다.

## 필요한 컴포넌트만 선택

| 필요 | 공식 API | 주의 |
|---|---|---|
| 단일 / 다중 선택 | Select / SelectMultiple, Option, SelectRenderChip | `value`, `onChange`. 선택 칩은 삭제와 필드 포커스 연결 |
| 모달 필터 | Modal, ModalContainer, ModalNavigation, ModalContent | `open`, `onOpenChange`. 내부 draft는 별도 관리 |
| 표 + 페이지 | Table, TableHead, TableRow, TableHeadCell, TableBody, TableCell, Pagination | Pagination은 `page`, `totalPages`, `onChange`. 검색/조건 변경 시 page 리셋 |
| 탭 | Tab, TabList, TabListItem, TabPanel | `value`, `onValueChange`. 버튼 그룹으로 탭을 가장하지 않음 |
| 입력 | FormControl, FormControlLabel, FormControlField, TextField, TextArea | label/id 연결, `status="negative"`, 오류 텍스트의 aria-describedby |
| 설정 | Checkbox, Switch, RadioGroup, RadioGroupItem | `onCheckedChange`와 `onValueChange`를 혼동하지 않음. aria-label 확인 |
| 펼치기 | Accordion, AccordionSummary, AccordionDetails, AccordionDescription | `expanded`, `onChange`, 또는 defaultExpanded |
| 결과 알림 | useToast | `toast({variant:'positive',content:'저장했어요.'})`. 실제 처리 성공 후 표시 |
| 진행 | ProgressIndicator | `percent` 0~100. 단계 의미/레이아웃은 제품 요구에 맞게 구성 |

날짜/시간 선택, autocomplete, tooltip, loading 등은 [공식 목록](https://montage.wanted.co.kr/docs/components)에서 확인 후 추가한다. starter에 없다고 임의의 새 스타일로 만들지 않는다. 이 참고문서가 모든 API를 대체하지 않는다.

## 정적 HTML에 Select만 넣을 때

[select-bridge.jsx](../assets/react-starter/src/select-bridge.jsx)는 기존 `<select>` 값을 유지하고 공식 React Select를 얹는 예시다. 이 파일은 기존 데모의 DOM id에 맞춰진 어댑터이므로 대상 프로젝트의 id/상태 연결을 수정해야 한다. starter 본체 빌드에는 포함하지 않는다.

- 네이티브 `<dialog>`는 top layer이므로 메뉴 portal을 `contentProps.container`로 해당 dialog 안에 둔다.
- `<dialog>`가 `overflow:hidden`이면 메뉴가 잘릴 수 있다. scroll body와 메뉴 portal의 위치를 나누거나 `overflow:visible`로 검증한다.
- 모달 열기/초기화 시 `wanted-filter-sync` 이벤트로 외부 값과 React 상태를 동기화한다.
- 기존 CSS reset이 공식 버튼/메뉴를 덮지 않는지 확인한다.

## 배포 범위

Montage는 MIT, Pretendard는 SIL OFL. 프로젝트에 함께 제공한 라이선스를 보존한다. 이 스킬은 독립적으로 만든 적용 가이드이며 원티드의 공식 스킬/제휴 제품이 아니다. npm 패키지는 공식 구현이고, 동봉 `wanted-web.css`는 관찰에 기반한 별도 CSS다. 둘을 같은 출처로 설명하지 않는다.

해커톤에서는 해당 환경에서 설치·외부 소스 사용이 허용된 범위에 맞춰 선택한다. 라이브러리가 공개되어 있다는 사실이 시험 내 반입 허가를 뜻하지 않는다.
