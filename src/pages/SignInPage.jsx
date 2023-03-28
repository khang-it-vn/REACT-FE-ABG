import React from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import Banner from "../partials/Banner";
import { useGoogleLogin } from "react-use-googlelogin";
// import { useGoogleAuth } from "../utils/GoogleAuthContext ";
// import { GoogleLogin, useGoogleLogin, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";

function SignInPage() {
  // const { signIn } = useGoogleAuth();
  // const { googleUser } = useGoogleLogin()

  // const login = useGoogleLogin({
  //   redirect_uri: "http://localhost:5173/signin",
  //   // flow: 'auth-code',
  //   onSuccess: (credentialResponse) => {
  //     console.log(credentialResponse.access_token);
  //   },
  // });
  const { signIn, loaded, error, user } = useGoogleLogin({
    clientId:
      "365062625571-oipgvhgr69fn34i2hahqdk1483hdqllg.apps.googleusercontent.com",
    onSuccess: (user) => console.log("Login success:", user),
    onFailure: (error) => console.log("Login failed:", error),
    redirect_uri: "http://127.0.0.1:5173/signin",
    scope: "appleghost1101@gmail.com",
    prompt: "select_account",
  });

  // if (user) {
  //   return <div>Welcome {user.name}!</div>;
  // }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1"></h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                {/* <form> */}
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                      <svg
                        className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                      </svg>
                      <span
                        className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                        aria-hidden="true"
                      ></span>
                      <div>
                        <button onClick={signIn}>Sign in with Google</button>
                      </div>
                      {/* <span
                        className="flex-auto pl-16 pr-8 -ml-16"
                        // onClick={signIn}
                      >
                        Đăng nhập bằng Google
                      </span> */}
                    </button>
                  </div>
                </div>
                {/* </form> */}
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-700 border-dotted grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-400">Hoặc, đăng ký bằng email</div>
                  <div
                    className="border-t border-gray-700 border-dotted grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-300"
                        placeholder="Điền email của bạn ở đây"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-300"
                        placeholder="Điền password của bạn tại đây"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-400 ml-2">
                            Lưu tài khoản
                          </span>
                        </label>
                        <Link
                          to="/reset-password"
                          className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Bạn chưa có tài khoản{" "}
                  <Link
                    to="/signup"
                    className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                  >
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Banner />
    </div>
  );
}

export default SignInPage;
