import React from 'react'
import { viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>#</tr>
            <tr>User Name</tr>
            <tr>Job Title</tr>
            <tr>Location</tr>
            <tr>Resume</tr>
            <tr>Action</tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map(()=>(
              <tr>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications