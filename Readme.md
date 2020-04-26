# Todo App Test

## 서버 실행

```
 cd todo-backend
 yarn install
 yarn dev
```

## Client 실행

```
 cd todo-frontend
 yarn  ##install
 yarn start
```

## 실행

브라우저에서 http://localhost:3000/
서버 http://localhost:5001/

### environments

- REACT (Typescript)
- AXIOS
- REDUX
- REDUX-TOOLKIT
- REACT-ROUTER-DOM
- Styled-components

- NODE
- SQLITE
- KOA
- SEQUELIZE
- TYPESCRIPT

### structure

```

├── todo-frontend   # frontend
│   ├── public
│   ├── src
|   |     ├── components
|   |
|   ├── containers
|        ├── containers
|        ├── lib
|             ├── api  데이터
|             ├── hook  # 커스텀 hooks
|             ├── utils.ts
|        ├── modules redux-toolkit
|        └── pages
│   └──
└── todo-backend     # backend
    ├── src
    │   ├── routes
    │   ├── db.ts
    │   ├── env.ts
    │   └──  server.ts
    │
    ├──db.sqlite

```

- [x] 사용자는 문자열로 된 todo 항목을 추가할 수있다.
- [x] todo는다른todo들을참조할수있다.
- [x] 사용자는 todo 목록을 조회할 수 있다.
- [x] 작성 일자, 최종 수정 일자, 내용, 참조하고 있는 todo들의 id가 표시되어야 한다.(예시 참고)
- [x] 페이지 네이션 구현 하면 가산점
- [x] 사용자는 todo 를 수정할 수 있다.
- [x] 사용자는 todo 를 삭제할 수 있다.
- [x] 사용자는 todo를 완료 또는 미완료로 상태 변경을 할 수있다.
- [x] 참조하고 있는 todo들이 모두 완료 상태가 아니라면 todo를 완료할 수 없다.
