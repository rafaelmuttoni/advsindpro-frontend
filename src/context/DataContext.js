import React, { useState, useEffect, useContext, createContext } from 'react'
import api from 'src/services/api'
import { useAlert } from './AlertContext'
import { useAuth } from './AuthContext'

import Drawer from 'src/components/Drawer'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)

  return context
}

export const DataProvider = ({ children }) => {
  const { user, loading } = useAuth()
  const { alert } = useAlert()

  const [data, setData] = useState(null)
  const [condo, setCondo] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('condos')
        setData(data)
      } catch (err) {
        alert('Ocorreu um erro na sua requisição', 'error')
      }
    }

    user && fetchData()
    // eslint-disable-next-line
  }, [user])

  const updateData = (method, category, payload) => {
    if (method === 'add') {
      const dataCopy = { ...data }
      dataCopy[category].push(payload)
      setData(dataCopy)
    }

    if (method === 'update') {
      const dataCopy = { ...data }
      const itemIndex = data[category].findIndex((el) => el.id === payload.id)
      dataCopy[category].splice(itemIndex, 1, payload)
      setData(dataCopy)
    }

    if (method === 'delete') {
      const dataCopy = { ...data }
      const itemIndex = data[category].findIndex((el) => el.id === payload.id)
      dataCopy[category].splice(itemIndex, 1)
      setData(dataCopy)
    }
  }

  const submit = async (category, form, isEditing) => {
    try {
      const { data } = isEditing
        ? await api.patch(`/${category}`, form)
        : await api.post(`/${category}`, form)
      isEditing
        ? updateData('update', category, data)
        : updateData('add', category, data)
    } catch (err) {
      return err
    }
  }

  const erase = async (category, id) => {
    try {
      await api.delete(`/${category}`, { data: { id } })
      updateData('delete', category, { id })
    } catch (err) {
      return err
    }
  }

  return (
    <DataContext.Provider
      value={{
        condo,
        data,
        submit,
        erase,
        loading,
        openDrawer: () => setIsOpen(true),
      }}
    >
      {children}
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        condo={condo}
        condos={data ? data.condos : []}
        setCondo={setCondo}
      />
    </DataContext.Provider>
  )
}
