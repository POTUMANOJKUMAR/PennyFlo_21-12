import React from 'react'
import NormalSelect from '../NormalSelect'
import "./styles.scss"
function NotificationForm({count}) {

const emailType=[{
        label:"Email Notification",value:"Email Notification"
      },
      {
        label:"Email Notification",value:"Email Notification"
      }
   ,
      ]
      const emailbeforeDue=[{
        label:"2 days",value:"2 days"
      },
      {
        label:"2 days",value:"2 days"
      },
    
     ]
     const emailafterDue=[{
        label:"none", value:"none"
     }]

const callType=[{
    label:"call Notification",value:"call Notification"
  },
  {
    label:"call Notification",value:"call Notification"
  }]

      const callAfterDue=[{
        label:"none",value:"none"
      } ]

   const  callbeforeDue=[{
    label:"5 days",value:"5 days"
},
{
  label:"5 days",value:"5 days"
},
   ]
   
   const physicalLetterType=[{
    label:"Physical Letter",value:"Physical Letter"
   },{
    label:"Physical Letter",value:"Physical Letter"
   }]
   const pysicalLetterBeforeDue=[{
    label:"15 days",value:"15 days"
   }]
   const pysicalLetterAfterDue=[{
    label:"none", value:"none"
   }]

  return (
    <div className="notification-form">
    <div className="row ">
    <div class=" mt-2 col-xs-12 col-sm-12 col-md-6 col-lg-4 ">
           <label className='notification-dropdown-headers'>Select Type</label>
         <div className="mt-2 mb-3"> <NormalSelect  notification_dropdown options={count===0? emailType:count===1?callType:physicalLetterType}/></div>
           </div> </div>
      <div className="row">    
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
           <label className='notification-dropdown-headers'>Trigger Notification Before</label>
           <div className="mt-2 mb-3"> <NormalSelect options={count===0?emailbeforeDue:count===1?callbeforeDue:pysicalLetterBeforeDue}/></div>
           </div>
           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
           <label className='notification-dropdown-headers'>Trigger Notification After</label>
           <div className="mt-2 mb-3"> <NormalSelect options={count===0?emailafterDue:count===1?callAfterDue:pysicalLetterAfterDue}/></div>
           </div></div>
           </div>
  )
}

export default NotificationForm