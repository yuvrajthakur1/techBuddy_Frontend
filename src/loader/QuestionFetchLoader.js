import { redirect } from "react-router-dom";
import api from "../axios/axios"

const questionFetchLoader =  async({params,request}) =>{
         try {
              const url = new URL(request.url);
              const type = url.searchParams.get('type');
              if (!type) return null;
              const res = await api.get("/practice/random-question",{
                params:{type} //it must be in the form of object
              })
        
              return res.data.randomQuestion.questionText;
         } catch (error) {
          console.log(error);
           return redirect("/login");
         } 
}

export default questionFetchLoader;