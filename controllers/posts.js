// controller 하는 일 
    // view 랑 model 사이에 동작을 제어 
    // model 에서 내보낸 객체를 가지고 연결 해야 함 




// model 에서 내보낸 객체를 가지고 연결 해야 함 

    // 아까, index.js 에서 user 랑 posts 를 내보냈음. 
        //     module.exports = {posts, user};

    // user 말고 post 만 가져오기
    const {posts} = require("../models")
        // 경로를 폴더 까지만 지정하면 > 자동적으로 index.js 를 찾는다. 
        // 만약, index.js 가 있으면, 그걸 가져온다. 
            //     const {posts} = require("../models/index.js") 와 동일

        // posts 만 가져올 때, 스프레드연산자를 사용함 


    // 내보내기 
        // 전체글 조회 메서드
            exports.ViewPostAll = async function(req, res) {
                try {
                    const data = await posts.viewPostAll();
                        // viewPostAll 이걸 하면 > 조회가 되고 > 그 티런값이 data 변수에 들어감 
                    return data

                } catch (error) {
                    console.log("전체글조회, 컨트롤러에서 에러남")
                }
            }
                // req, res 응 응답 객체가 아니라, 그냥 !! 매개변수임 

        // 글 하나 조회 메서드
            exports.SelectPost = async function(req, res) {
                const {id} = req.params;
                    // 요청 객체에서 온 값을 넣을 것 임. 
                    // 요청 객체를 매개변수로 전달해줄 예정.

                try {
                    const data = await posts.selectPosts(id);
                    return data;

                } catch (error) {
                    console.log("글 한개 조회, 컨트롤러, 에러남")
                }
            }
            // module.exports 에서 module 을 생략? ❓❓❓❓❓❓ 


        // 게시글 등록 메서드 
            exports.Insert = async function(req, res) {
                // 요청 객체를 매개변수로 전달 해줄 예정 
                const {title, content} = req.body;
                    // form 으로 가져오면, req 안에 body 안에 있는거지

                try {
                    await posts.insert(title, content);
                        // 작성한 걸로 추가
                } catch (error) {
                    console.log("글 추가 컨트롤러 에러남")
                }
            }


        // 게시글 수정 
            exports.Update = async function(req, res) {
                const {id} = req.params;
                    // ❓❓❓❓❓❓❓ 

                const {title, content} = req.body

                try {
                    await posts.update(id, title,content);
                } catch (error) {
                    console.log("글 수정 컨트롤러 에러남")
                }
            }

        
        // 게시글 삭제 
            exports.Delete = async function(req, res) {
                const {id} = req.params;
                try {
                    await posts.delete(id);
                } catch (error) {
                    console.log("글 삭제 컨트롤러 에러남~")
                }
            }


// 🔷 이제 컨트롤로러 설정한 값을 view 에 반영 
    // 이전에는, app.js 에 app.post, app.get, 등등 다 써줬음. 
    // 라우팅 관리 ex) post/id 이렇게 했었어 
    // 이 라우터 관리를 폴더로 만들어서 할 것 임 ⭐⭐⭐⭐⭐ 
