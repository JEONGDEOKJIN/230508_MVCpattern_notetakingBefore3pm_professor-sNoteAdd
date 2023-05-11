// 게시판을 만들었었는데, 하나의 파일(index.js)에 다몰아서 만들었음. 
// 근데, 로그인도 있고, 보드도 있고 해서, 관리하기가 너무 힘듦. 
// 그래서, 폴더로 쪼갠다. 
    // 쪼갤 수 있으면 쪼개는게 좋아 

// 'MVC 패턴' 으로 만들어볼 것

// 🔷 'MVC 패턴' 
    // 의의
        // 가장 많이 사용, 표준적인 디자인 패턴 
    // 필요성 
        // 유지보수, 확장성을 고려해서 개발할 수 있다.
        // 코드 협업 할 때 '여기에, 이런 기능이 있겠구나.' 라고 알 수 있음. 
    
    // mvc 패턴은 model-view-controller 의 줄임말
    // 이 방식으로 폴더를 쪼갤거야

    // model
        // '데이터'를 다루는 '로직'
        // 글 선택, 글 작성 등등의 기능 
        // 어플리케이션 '동작' 을 관리하는 폴더 
    
    // view 
        // 사용자가 '볼 수 있는 화면'의 데이터를 표시 해주는 역할 

    // controller 
        // 모델과 view 사이에서 동작 
        // model(기능) 의 상태를 view 에 반영 시켜주는 것 
    
    // 이런 패턴으로 작업하면, 유지보수와 코드의 표준화를 유지할 수 있다. 


// 🔷 view 엔진 
    // ejs 사용할 예정 

    // 1.1 설치 
        // npm i ejs


// 🔷 데이터 - mysql2 
    // 1.1 설치
        // npm i mysql2
        // npm i mysql2 ejs express (한번에 설치⭐⭐⭐)


// 🔷 작업 순서
    // 1. package.json 
        // 1.1 기본값으로 만들기 
            // npm init -y

        // 1.2
            // package.json 에서 script 작성
    
    // 2. express 모듈 불러와서 서버 만들기
        // 2.1 express 설치
            //  npm install express

        // 2.2 express 모듈로 가져와서 인스턴스 만들기
            const express = require("express");
            const app = express();


        // 🔷 라우터 가져오기 
        const postRoute = require("./routes/posts")

            
        // 2.3 대기 상태로 만들기
        const PORT = 8050;

        // view 엔진 사용 위해 path 받기 
            // ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓ 
        const path  = require("path")


        // view 엔진으로 ejs 사용할 예정
            app.set("views" , path.join(__dirname, "page"));
            // view 엔진으로 보여줄 파일들의 경로 설정
            // 기본이 view 폴더 인데 page 로 변경

        // body 객체 사용위해, 미들웨어 추가 
            // bodyparser 를 express 에서 지원함 
            // extended 는 깊은 객체 사용 여부 
            // false 면 사용안함. | false 가 기본값

                    // view 엔진으로 ejs 사용하도록 설정 
                    app.set("view engine" , "ejs")
        app.use(express.urlencoded({extended:false}))

        // 정적인 파일을 사용하기 위해 미들웨어 추가 
            app.use(express.static(path.join(__dirname, "public")));
            // 정적인 파일을 모아놓은 경로를 public 폴더로 지정 
            // /css" css 를 붙이면, 다 css 로 접근 가능 
                // app.use("/css", express.static(path.join(__dirname, "public")));
                    // 이렇게 지정한 경우, ejs 단에, /css/파일명 으로 접근하면 된다. 
                    // 정적 파일 경로도 나눌 수 있다. 

            // 이걸 안 쓰면 root 로 접근됨
            // 매개변수로지정하지 않으면 기본적으로 / 루트경로로 지정함
                    // app.use(express.static(path.join(__dirname, "public")));


        // 🔷 라우터 
            // postRoute 객체에 get 메서드로, / 루트 경로 지정했을 때 
            // /posts 경로도 추가되어서 라우팅 된다. ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓ 
            // 게시글은 /posts 까지 붙어야, 루트경로로, 요청이 된다. 
            // 앞에 붙고, > 이 말은 / 루트 경로 앞에 붙는다. 
            // /post/list 이렇게 되어 있음 ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓ 

            app.use("/posts" , postRoute)






        // 대기 상태로 만들기 
        app.listen(PORT, () => {
            console.log(`${PORT} 에서 서버 열림👲👲`)
        })



