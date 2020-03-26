import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function Profile() {
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')

  const history = useHistory()
  const [ incidentsList, setIncidentsList ] = useState([])

  useEffect(() => {
    try {
      api.get('profile', {
        headers: {
          authorization: ongId,
        }
      })
        .then(response => {
          setIncidentsList(response?.data)
        })
    } catch (e) {
      alert('Erro ao buscar casos')
    }
  }, [ongId])


  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId,
        }
      })
      setIncidentsList(incidentsList.filter(inc => inc.id !== id))
    } catch (e) {
      alert('Erro ao deletar caso')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The hero"/>
        <span>Bem Vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastro novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        { incidentsList.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDelete(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        )) }
      </ul>
    </div>
  )
}