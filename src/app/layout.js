import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navigations from './Component/Navigations';
import { ConfigProvider } from 'antd';
import { UserAuthProvider } from '../../auth/UserAuthProvider';
import { Toaster } from 'react-hot-toast';



const style={ margin: 0 }
export const metadata = {
  title: 'Easy Libro',
  description: 'Easy Libro',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body style={style}>
      <AntdRegistry> 
      <ConfigProvider
        theme={{
          components:{
            Button:{
                colorPrimary: '#001529',
            },
        }
        ,
        token:{
          colorPrimary:'#001529',
        }}}>
        <UserAuthProvider>
          <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={5}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            // style: {
            //   background: '#001529',
            //   color: '#fff',
            // },
        
            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}/>
        <Navigations>
          {children}
        </Navigations>
        </UserAuthProvider>
        </ConfigProvider>
        </AntdRegistry>
        </body>
    </html>
  )
}
