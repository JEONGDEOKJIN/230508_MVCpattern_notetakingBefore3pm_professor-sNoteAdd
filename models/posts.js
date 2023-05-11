const mysql = require("./config")
    // config 파일을 가져오면 > 그 파일에 있는 반환값인 mysql 이 들어온다. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

console.log(mysql);


// 여기에서 posts 에 대한 기능을 작성 
    // 다 작성하고 이걸 module exports 로 내보낸다. 
    // 즉, 연결은 config.js 에서 하고 ⭐⭐⭐⭐⭐⭐⭐ 
    // posts 에서 는 글의 내용 작성과 수정 기능 ⭐⭐⭐⭐⭐⭐⭐⭐ 

// 게시판의 기능(글 내용 작성, 수정, 추가 삭제) 작성될 공간

    const posts = {
        // 테이블을 초기화 하는 함수
            initTable : async function() {
                try{
                    const [result] = await mysql.query("SELECT * FROM posts")
                        // [result] | 배열의 스프레드 연산자 
                                    // 0 1 2 3 4 이런식으로 순서대로 담긴다 ⭐⭐⭐⭐⭐⭐⭐ 
                                    // 이렇게 하면, content, title, 에 필요한 것만 담기게 됨. 
                    console.log(result);

                }
                catch(error) {
                    // console.log(error)
                    await mysql.query("CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20), content VARCHAR(100))");
                        // 테이블이 없어서 오류가 나면 > create 를 해~ 라는 말 ⭐⭐⭐⭐⭐ 
                }
                    // id : 자동으로, 증가하는, 고유키를 id 로 
            },
                // 비동기 처리 해서 실행
                // 한번 실행하는 중 - 오류나면(테이블이 없어서 오류나면) - 종료 됨 - so, try catch 문을 작성 > 그래서 오류 나도 종료되지 않게 ⭐⭐⭐

        // 글의 리스트를 조회하는 함수
            viewPostAll : async function() {
                try {
                    const [result] = await mysql.query('SELECT * FROM posts')
                        // posts 테이블 안에 있는 데이터를 전부 조회 
                        return result; 
                } catch (error) {
                    console.log("글 전체 조회를 하려 했는데, 에러남")
                        // 이렇게 쓰면, 어디에서 에러났는지 알 수 있음. ⭐⭐⭐⭐⭐
                    
                }
            }, 
        
        // 글을 선택했을 때, 글 하나를 보여줄 함수 
            selectPosts : async function(id) {
                try {
                    const [result] = await mysql.query("SELECT * FROM posts WHERE id = ?" , [id]);
                    // 매개변수로 전달 받아서 > 전달받은 id 를 조회해주는 함수

                    console.log("선택한 게시글 : ", result[0]);
                        // 배열 안에 있는 값 첫 번째것만 가져오려고 0 을 함 
                    return result[0];

                } catch (error) {
                    console.log("글 선택 조회 에러남")
                    
                }
            }, 
                // async 는 await 랑 붙어 다님 
                // then 메소드를 쓰거나, vs async await 를 쓰던지, 둘 중 하나만 써야 함. ⭐⭐⭐⭐⭐ ❓❓❓❓❓ 
                // 같이 쓰면 절 대 안 됨 ⭐⭐⭐ | 기능은 되지만, 욕먹음 

        // 글을 추가하는 메서드 
        insert : async function(title, content) {
            try {
                await mysql.query("INSERT INTO posts (title, content) VALUE (?,?)", [title, content]);
                    // 'mysql.query("INSERT INTO posts (title, content) VALUE (?,?)", [title, content])' 여기의 결과값은 'promise 객체' 임 
                    // promise 객체인 이유는 connectionPool 을 해서 sql 에 연결했기 때문에 
                    // query 로 가서 값을 찾는데 시간이 1초 걸리는데, 
                        // 1) await 를 걸면 > 1초 걸리는 시간을 기다렸다가, > 값을 찾고 > console.log 아래줄로 내려간다. 
                        // 2) 만약, await 가 없으면 > 1초 걸리는 시간을 안 기다려주고 > 바로 console.log 로 내려간다 > 그 결과, 찾아야 하는 값을 찾지 못 하게 됨. 
                        // 이게 비동기를 쓰는 이유 ⭐⭐⭐⭐⭐⭐⭐⭐ 
                        // 즉, query 하는 과정이 걸리기 때문에, 시간을 기다려줘야 하고, 그래서 await 라는 비동기 를 쓸 수 밖에 없음. 


                    // posts 테이블에 , title, content 열 추가 할거야.  
                    // 어떤 밸류를 추가해?  ?? 로 place holder 해놓고, 
                    // placeholder 에 들어갈 값은 ⭐매개변수⭐로 받아서 넣어준다. 
                    console.log("글 추가 완료🙆‍♂️🙆‍♂️")

            } catch (error) {
                console.log("글 추가 에러 났어!!!!📛📛")
            }
        }, 

        // 글 수정 메소드 
        update : async function(id, title, content) {
            try {
                await mysql.query("UPDATE posts SET title = ?, content = ? WHERE id = ?" , [title, content, id]);
                // 글을 찾아서 > 수정 
                // ? 에는 수정할 내용을 넣을거야, 
                // ? 을 배열로 물음표 순서대로 전달
                console.log("게시글 수정 완료🙆‍♂️🙆‍♂️");

            } catch (error) {
                console.log(error)
                
            }
        }, 

        // 글 삭제 하는 메소드 
        delete : async function(id) {
            try {
                await mysql.query("DELETE FROM posts WHERE id = ?; SET @CNT = 0; UPDATE posts SET posts.id = @CNT:=@CNT+1; ALTER TABLE posts AUTO_INCREMENT = 0;", [id]);
                    // ; 하나의 코드가 끝났음을 알려줌 
                    // @CNT:=@CNT+1; 이렇게 id 를 더해서 > id 를 재정렬 ⭐⭐⭐ 
                    // posts AUTO_INCREMENT = 0; > 새롭게 초기화 추가해줘야, 다시 글 넣을 때, 11 로 되지 않음. 

                    // [id] 에서 [ ] 이걸 쓰는 이유는? 쿼리문에서 변수 받기? 
                console.log("게시글 삭제 완료");

            } catch (error) {
                console.log(error)
                console.log("게시글 삭제 하려 했는데, error");
            }
        }

    }

// 🔷 여기에서 중요한 점 
    // try - catch 구문의 사용 
        // error 가 나면, 멈추지 않고, 해당 내용을 찍어줌, 어떤 메소드에서 오류가 났는지 
        // 이게 없으면, error 가 나면 > 프로그램이 그냥 멈춰버림 

    // await 사용 
        // 이건 왜 써야 하는지 모르겠어... 


    // 배열의 스프레드 연산자 | [result]
        // 그냥, result 만 쓰면, 이것 저것 막 다 담김 
        // sql 에서 필요한 id, title, content 만 가져오고 싶음. 
        // 그러려면, 배열 스프레드 연산자만 사용   
        // 그러면, 0 1 2 3 4 이런식으로 순서대로 담긴다 ⭐⭐⭐⭐⭐⭐⭐ 





// 🔷 각각 기능 확인 
    posts.initTable()
        // 포스트 객체 안에 이쓴 ini

    // 선택 게시글 조회 테스트
        // posts.selectPosts(1) // 그대로 나옴 
        // posts.selectPosts(2) // undefined


    // 글 추가 
        posts.insert("글 추가 함", "콘텐츠!!")

    // 글 수정 
        // posts.update(1, "타이틀수정", "콘텐츠수정2")

    // 글 삭제
        // posts.delete(7)


// 밖으로 빼기 
    module.exports = posts