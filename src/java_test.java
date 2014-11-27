public static void swap(Object x, Object y) {
		
		Field[] fields = x.getClass().getDeclaredFields();

        // 取得每个成员变量的值
        for (Field field : fields) {
           
            Method method;
			try {
				method = x.getClass().getMethod(
				        getGetMethodName(field.getName()), new Class[] {});
				
				// 通过反射调用getter函数给取得成员变量的值
	            Object resultx = method.invoke(x, new Object[] {});
	            Object tem=resultx;
	            
	            method = y.getClass().getMethod(
				        getGetMethodName(field.getName()), new Class[] {});
				
	            Object resulty = method.invoke(y, new Object[] {});
	            
	            method = x.getClass().getMethod(
                        getSetMethodName(field.getName()),
                        new Class[] { String.class });

                // 通过反射调用setter函数给成员变量赋值
                method.invoke(x, new Object[] { resulty });
                method = y.getClass().getMethod(
                        getSetMethodName(field.getName()),
                        new Class[] { String.class });

                // 通过反射调用setter函数给成员变量赋值
                method.invoke(y, new Object[] { tem });
                
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

            
            // 将此值赋给节点文字
            
        }
	}
