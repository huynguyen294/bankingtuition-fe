import { memo, useEffect, useState } from "react"
import { useStore } from "react-redux";
import { useNavigate } from "react-router";

function CheckLogin(){

    const store = useStore();
    const navigate = useNavigate();
    const [handleNavigate ,setHandleNavigate] = useState(false)
    
    useEffect(()=>{
        const unSubcribe = store.subscribe(()=>{
        const { isLogin } = store.getState();
        if(!isLogin){
            setHandleNavigate(true)
            navigate('/login', {replace: true})
        }
        });
        return ()=>{
        setHandleNavigate(false)
        unSubcribe()
        }
    }, [handleNavigate])

    //ktra lần đầu vào web
    useEffect(()=>{
        const { isLogin } = store.getState();
        if(!isLogin){
            setHandleNavigate(true)
            navigate('/login', {replace: true})
        }
    }, [])

    return null
}

export default memo(CheckLogin)