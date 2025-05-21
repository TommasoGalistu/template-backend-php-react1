import { use } from 'react';
import { ContextData} from '../../store/data';
import {  useNavigate } from 'react-router-dom';
import useFetchWithLoading from '../../utils/fetchRequest';

function Logout(){
    const {isLoggin, setIsLoggin} = use(ContextData)
    const navigate = useNavigate()
    const fetchData = useFetchWithLoading();
    async function logout(){
        try{
            const response = await fetchData('http://localhost:3000/user/logout',{
                method: 'GET',
                
            })
            if (response.error) {
                throw new Error(response.error);
            }
            
            
            setIsLoggin(false)
            navigate('/login')
        }catch(error){
            console.log(error.message)
            navigate('/privato')
            setIsLoggin(true)
        }
        
    }
    logout()

    return <h1>logout</h1>
}

export default Logout