import React, {useState} from "react";

//각각에 함수를 정의해서 쓸 수 있지만 그러기엔 시간이 너무 많이 소요됨

const Input2 = () =>{
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        tel: ""
    });
    //Object형식으로 inputs을 선언함 inputs field안에는 name, email, tel이 있음

    const {name, email, tel} = inputs; //아래에서 사용하기 위해 선언함

    const onChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;

        setInputs({
            ...inputs,      //위의 inputs을 파싱해서 가져옴
            [id]: value,    //id, value 각각을 매칭
        });
    };
    

    //e: event, target: target, value: value

    return(
        <div>
            <div>
                <label>이름</label>
                <input type="text" id="name" value={name} onChange={onChange}></input>
            </div>
            <div>
                <label>이메일</label>
                <input type="text" id="email" value={email} onChange={onChange}></input>
            </div>
            <div>
                <label>전화번호</label>
                <input type="text" id="tel" value={tel} onChange={onChange}></input>
            </div>

            <p>Name: {name}</p>
            <p>email: {email}</p>
            <p>tel: {tel}</p>
        </div>
    );
}

export default Input2;