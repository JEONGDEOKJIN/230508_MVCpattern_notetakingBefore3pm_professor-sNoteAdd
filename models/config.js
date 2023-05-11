// 여기에서 이제 mysql 관리 예정 


const mysql2 = require("mysql2/promise");
    // 전에 사용했던 createConnection 메소드는 '콜백함수' 기반임. 
        // 이건 ⭐테스트⭐ 할 때 사용 
        // 가장 기본적인 연결 
        // ⭐단일 클라이언트⭐ 접속에 용이
        // promise 객체를 반환하지 않았음.

    // createPool 메소드
        // 여러명의 클라이언트가 들어왔을 때, 관리할 수 있음 
        // ⭐여러명⭐ 와도, 기능 유지 가능 
        // ⭐promise 객체를 반환⭐ > so, 여러개의 요청을 처리할 수 있음. 성능 유지 가능 
        // 많은 클라이언트가 데이터베이스와 통신할 때, 요청이 많이 들어와도, 성능 유지 가능. 
        // 여러개의 요청을 처리할 수 있음. 
        // 여러명이 동시에 요청해도, 성능이 유지된다. 

const mysql = mysql2.createPool({
    user : "root", 
    password : "mysqlpwdj", 
    
    // 다중 쿼리문 사용할 예정 
    multipleStatements : true,
        // 다중 쿼리문 사용 설정 

    // test9 이름으로 벤치마크에서 스키마 생성 
    database : "test9"
        
})

// 연결 확인 메서드 
mysql.getConnection((err,res) => {
    // 연결이 정상적으로 되지 않으면 -> err 에 내용이 들어옴 
        console.log(err)
    // 정상 연결이면 -> res 에 연결 인스턴스가 넘어옴. 
        console.log(res)
})

module.exports = mysql;
    // 모듈로, 이 파일에서 내보낸다. 
    // 다른 파일에서 이 파일의 반환값을 받을 수 있어 
    // 현재 반환하는 반환값은 mysql ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 