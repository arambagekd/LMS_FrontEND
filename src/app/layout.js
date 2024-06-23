import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navigations from './Component/Navigations';
import { ConfigProvider } from 'antd';
import { UserAuthProvider } from '../../auth/UserAuthProvider';


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
