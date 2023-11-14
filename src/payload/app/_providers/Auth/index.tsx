'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { User } from '../../payload-types'
import { gql, USER } from './gql'
import { rest } from './rest'
import { AuthContext, Create, ForgotPassword, Login, Logout, ResetPassword } from './types'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode; api?: 'rest' | 'gql' }> = ({
  children,
  api = 'rest',
}) => {
  const [user, setUser] = useState<User | null>()
  
  useEffect(()=>{console.log(user,"Inside Effect")}, [user]);
  const create = useCallback<Create>(
    async args => {
      if (api === 'rest') {
        const user = await rest(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users`, args)
        setUser(user)
        return user
      }

      if (api === 'gql') {
        const { createUser: user } = await gql(`mutation {
        createUser(data: { email: "${args.email}", password: "${args.password}", firstName: "${args.firstName}", lastName: "${args.lastName}" }) {
          ${USER}
        }
      }`)

        setUser(user)
        return user
      }
    },
    [api],
  )

  const login = useCallback<Login>(
    async args => {
      if (api === 'rest') {
        const user2 = await rest(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/login`, args)
        console.log(user2,"121453")
        setUser({id: '1',
      email: 'example@example.com',
      password: 'password123',
      updatedAt: '2023-09-01',
      createdAt: '2023-08-01',})
        console.log(user,'2')
        return user
      }

      if (api === 'gql') {
        const { loginUser } = await gql(`mutation {
        loginUser(email: "${args.email}", password: "${args.password}") {
          user {
            ${USER}
          }
          exp
        }
      }`)

        setUser(loginUser?.user)
        console.log("loi")
        return loginUser?.user
      }
    },
    [api],
  )

  const logout = useCallback<Logout>(async () => {
    if (api === 'rest') {
      await rest(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/logout`)
      setUser(null)
      return
    }

    if (api === 'gql') {
      await gql(`mutation {
        logoutUser
      }`)

      setUser(null)
    }
  }, [api])

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`,
          {},
          {
            method: 'GET',
          },
        )
        setUser(user)
      }

      if (api === 'gql') {
        const { meUser } = await gql(`query {
          meUser {
            user {
              ${USER}
            }
            exp
          }
        }`)

        setUser(meUser.user)
      }
    }

    fetchMe()
  }, [api])

  const forgotPassword = useCallback<ForgotPassword>(
    async args => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/forgot-password`,
          args,
        )
        setUser(user)
        return user
      }

      if (api === 'gql') {
        const { forgotPasswordUser } = await gql(`mutation {
        forgotPasswordUser(email: "${args.email}")
      }`)

        return forgotPasswordUser
      }
    },
    [api],
  )

  const resetPassword = useCallback<ResetPassword>(
    async args => {
      if (api === 'rest') {
        const user = await rest(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/reset-password`, args)
        setUser(user)
        return user
      }

      if (api === 'gql') {
        const { resetPasswordUser } = await gql(`mutation {
        resetPasswordUser(password: "${args.password}", token: "${args.token}") {
          user {
            ${USER}
          }
        }
      }`)

        setUser(resetPasswordUser.user)
        return resetPasswordUser.user
      }
    },
    [api],
  )

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        create,
        resetPassword,
        forgotPassword,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext // eslint-disable-line no-unused-vars

export const useAuth: UseAuth = () => useContext(Context)
