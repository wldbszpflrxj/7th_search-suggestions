# 원티드 프리온보딩 7차 과제

> ## 2팀 소개

<table>
  <tr>
    <td height="50px" align="center"><a href="https://github.com/nknkcho">조남경<br>(팀장)</a></td>
    <td height="50px" align="center"><a href="https://github.com/Taak-e">김주탁</a></td>
    <td height="50px" align="center"><a href="https://github.com/
hyoungqu23">이형민</a></td>
    <td height="50px" align="center"><a href="https://github.com/
wldbszpflrxj">변지윤</a></td>
    <td height="50px" align="center"><a href="https://github.com/hasunghwa">하성화</a></td>
    <td height="50px" align="center"><a href="https://github.com/HaJunRyu">류하준</a></td>
  </tr>
  <tr>
    <td align="center" colspan="2">화면 UI / 
    <br/>키보드 인터렉션</td>
    <td align="center" colspan="2">API 호출</td>
    <td align="center" colspan="2">API 호출 최적화</td>
  </tr>
</table>

> ## 데모
![데모영상](https://user-images.githubusercontent.com/93869214/192932507-c920b659-b5c6-491e-af53-16b1b70a1df4.gif)

> ## 실행 방법

```sh
yarn install

yarn api

yarn dev
```

> ## 목차

- [과제 내용](#과제-내용)
- [폴더 구조](#폴더-구조)
- [과제 요구사항 및 해결 방법](#과제-요구사항-및-해결-방법)
- [기술 스택](#기술-스택)

> ## 과제 내용

원티드 프리온보딩 프론트엔드 기업 협업 과제

- ### 주제

  - 검색창 구현 + 검색어 추천 기능 구현

- ### 기간
  - 2022년 9월 27일 ~ 9월 29일

> ## 폴더 구조

```
📦
├─api
├─assets
├─components
│  └─search
│      ├─KeywordItem
│      ├─SearchKeywordTab
│      ├─searchResult
│      │  ├─RecentResult
│      │  └─SuggestionResult
│      ├─SearchTab
│      └─UI
├─pages
│  └─Home
├─styles
└─utils

```

<br/>

> ## 과제 요구사항 및 해결 방법

### 화면 UI 및 키보드 인터렉션

**해결방법**

- UI의 경우, 빠른 구현이 필요한 만큼 페어 프로그래밍을 통해 작업하였습니다.
- 최근 검색어와 추천 검색어 결과창에서 다루는 관심사가 다르다고 판단해 컴포넌트를 분리하여 구현하였습니다. `searchResult/RecentResult`, `searchResult/SuggestionResult`
- 검색창 마우스 클릭 시 최근 검색어 결과창이 뜨고, 검색창 바깥 부분 클릭 시 검색창이 닫히도록 구현하였습니다.
- 검색어 입력 후 화살표 아래 방향키를 누르면 추천 검색어 리스트로 이동할 수 있도록 키보드 인터렉션을 추가하였습니다.

**트러블 슈팅**

- svg 이미지를 컴포넌트로 만들어 구현했으나, 플러그인을 사용하여 svg 자체를 import 하도록 변경해주었습니다.

**미해결 이슈**

- onBlur 속성 안에서 추천검색어 Tab이 닫히도록 설정하였으나, onBlur 가 Tab 안에서의 클릭을 감지하지 못해 마우스로 추천검색어 클릭시 걸었던 `handleSuggestionItemClick` 함수가 동작하지 않는 문제가 있습니다.

### API 호출

**해결방법**

- 확장성을 고려해 Axios 인스턴스를 생성해 재사용되는 config를 처리했습니다.
- Axios의 request interceptor를 활용해 모든 api 요청에 요구사항 `console.info("calling api")`를 삽입했습니다.
- `json-server`의 Full Text Search를 활용해 검색 api를 추가했습니다.
- 전체 데이터를 가져오는 api의 경우 해당 과제에서 불필요하다고 생각해 제거했습니다.

**트러블 슈팅**

- 단순 keyword를 인자로 받아 API 호출을 하도록 처리했으나, 코드 리뷰 결과 확장성을 고려해 객체 형태로 인자의 데이터 타입을 변경했습니다.
- Axios의 request interceptor를 eject하는 경우를 대비하여 함수로 분리하는 방식을 고민했으나, 이번 과제에서는 불필요한 코드라고 생각되어 제거했습니다.

### API 호출 최적화

**해결방법**

- 검색창에 텍스트를 입력하면 debounce를 이용해 0.5초마다 추천검색어 api를 호출하도록 구현하였습니다.
- string.prototype.slice를 이용하여 검색어 이전, 검색어 이후의 문자열을 각각 분리하여 일반적인 텍스트로 렌더링하고 검색어는 스타일링 한 컴포넌트로 랩핑해주어 `사용자가 입력한 텍스트와 일치하는 부분 볼드(하이라이트)처리` 하는 요구사항을 구현하였습니다.
- searchSuggestList 상태를 객체 형태로 관리함으로써 api호출 후 response 받을때마다 상태 객체에 `{ [searchKeyword]: response }` 형태로 저장해주고 api호출하기 전 `searchSuggestList[searchKeyword]`를 한번 참조하게끔 하여 상태 객체에 이미 존재하는 searchKeyword라면 api 호출하지 않고 메모리에 존재하는 값을 사용하도록 로컬 캐시를 구현하였습니다.

**트러블 슈팅**

- debounce함수 적용시 인자가 전달되지 않는 문제가 발생하여, return문 안에서 인자를 전달받을 수 있도록 했습니다. 인자는 객체 형태로 전달할 수 있습니다.

> ## 기술 스택

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
