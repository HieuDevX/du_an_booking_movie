import React ,{useEffect}from 'react'
import {useFormik,Formik,Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'
import { useDispatch , useSelector, } from 'react-redux'
import {LoginAction} from '../redux/actions/userAction'
import { NavLink ,useHistory,} from 'react-router-dom'
import {userReducers} from '../redux/Reducers/userReducers'


 function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const getCheckLogin = useSelector(state => state.user.checkLogin)
    const LoginSchema = yup.object().shape({
        taiKhoan: yup.string().required("*Vui lòng nhập tên tài khoản"),
        matKhau: yup.string().required("*Vui lòng nhập mật khẩu")
    })
    const _handleSubmit = (values) =>{
       
        dispatch(LoginAction(values))
        
    }
    useEffect(() => {
        if(getCheckLogin){
            history.push('/home')
        } 
        
    }, [getCheckLogin])
    
    return (
        <div className="w-50 mx-auto">
            <h1 className="text-center display-4">Đăng nhập</h1>
            <Formik
                initialValues =  {{
                    taiKhoan: "",
                    matKhau: ""
                }}
                validationSchema = {LoginSchema}
                onSubmit={_handleSubmit} // gọi hàm submit
                render = {(formikProps) =>(
                    <Form >
                    <div className="form-group">
                        <label>Tài khoản</label>
                        <Field className="form-control"
                            name= "taiKhoan"
                            type= "text"
                            onChange={formikProps.handleChange}
                
                            />
                        <ErrorMessage name="taiKhoan">
                            {
                                (err) => <div className="alert alert-danger">{err}</div>
                            }
                        </ErrorMessage>

                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <Field className="form-control"
                            name= "matKhau"
                            type= "password"
                            onChange={formikProps.handleChange}
                           
                            />
                         <ErrorMessage name="matKhau">
                         {
                                (err) => <div className="alert alert-danger">{err}</div>
                            }
                         </ErrorMessage>

                    </div>
                    <div className="text-center">
                        <button className="btn btn-success mr-2" type="submit">
                            Đăng nhập
                        </button>
                        <button className="btn btn-success" >
                            <NavLink to="/regis">Đăng Ký</NavLink>
                         
                        </button>
                    </div>
                </Form>
            )}>
                
            </Formik>
        </div>
    )
}
export default (Login);
