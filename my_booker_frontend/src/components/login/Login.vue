<template>
    <div id="page-container">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="12">
          <div id="form-container">
            <p class="font-weight-bold xl-p">Sign In</p>
            <a-form
              id="components-form-demo-normal-login"
              :form="form"
              class="login-form"
            >
              <a-form-item>
                <a-input
                  v-decorator="[
                    'userName',
                    { rules: [{ required: true, message: 'Please input your username!' }] },
                  ]"
                  placeholder="Username"
                >
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
                    'password',
                    { rules: [{ required: true, message: 'Please input your Password!' }] },
                  ]"
                  type="password"
                  placeholder="Password"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-checkbox
                  v-decorator="[
                    'remember',
                    {
                      valuePropName: 'checked',
                      initialValue: true,
                    },
                  ]"
                >
                  Remember me
                </a-checkbox>
                <a class="login-form-forgot" href="">
                  Forgot password
                </a>
                <a-button type="primary" html-type="submit" class="login-form-button">
                  Log in
                </a-button>
                Or
                <a href="">
                  register now!
                </a>
              </a-form-item>
            </a-form>
          </div>
        </a-col>
        <a-col :span="12">
          col-12
        </a-col>
      </a-row>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
        return {
            selected_prefix_number: '+63',
            date_format: 'YYYY/MM/DD',
            form: this.$form.createForm(this, { name: 'normal_login' }),
        }
    },
    computed: {
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    #components-form-demo-normal-login .login-form {
      max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
      float: right;
    }
    #components-form-demo-normal-login .login-form-button {
      width: 100%;
    }
    #components-form-demo-normal-login .login-form {
      max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
      float: right;
    }
    #components-form-demo-normal-login .login-form-button {
      width: 100%;
    }

    #page-container {
      width: 100%;
      height: 100%;
    }
  </style>
  