

// 게시글의 라우터만 모아놓을 파일 
    // 라우팅을 도와줄 파일 
    const express = require("express");

    // Router 메서드 라우팅을 관리할 수 있게 도와주는 메서드
        // 라우터를 나눠서 관리할 수 있다. 
        // 라우팅의 내용을 작성해 놓고, app.use 로 추가 
    const router = express.Router();


    // 컨트롤러에 작성한 내용을 가져오기 
    const {ViewPostAll, SelectPost, Insert, Update, Delete} = require("../controllers/posts");

    router.get('/' , async (req, res) => {

        try {
            const data = await ViewPostAll(req, res);
                // 이 함수 실행 시키면 > 매개변수로 req, res 전달하고 
                // 들어가면, 
                // 모델에서 데이터가 들어오고 > 화면을 그림 ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓ 
            res.render('main' , {data})     // ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓
        } catch (error) {
            console.log("게시글 리스트 화면 그리다 오류남")
        }
    })
        // req, res 요청 객체, 응답 객체가 들어옴

    // 게시글 상세 페이지
    router.get('/view/:id' , async (req, res) => {
        try {
                // 이 url 로 가면 > select POST 메소드가 실행 
                // 이 메소드는 요청객체, 가 있음. 
                // 요청 객체 에서 PARAMES > 이걸 view1, view2 이렇게 
            const data = await SelectPost(req, res);
            res.render('detail' , { data });
        } catch (error) {
            console.log("게시글 상세 페이지 그리다 에러남");
        }
    } )
        // 이 라우터에 view 라는 url 로 접속하면 params 받을거고? ❓❓❓❓❓❓❓❓❓❓❓


    // 게시글 추가 페이지 
        router.get('/insert' , (req, res) => {
            res.render('insert');
        })
    
    // 추가하면 받을 라우터 작성 
        // 게시글 추가 요청이 들어오면 
        router.post('/insert' , async (req, res) => {
            try {
                await Insert(req, res);
                res.redirect("/posts");
            } catch (error) {
                console.log("글 추가 하다가 에러남. 여기 프론트 임.")
            }
        })


    // 게시글 수정 페이지 
    router.get("/edit/:id" , async (req, res) => {
        try {
            const data = await SelectPost(req, res)
            res.render('' , {data});
        } catch (error) {
            
        }
    })

    module.exports = router;