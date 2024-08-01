const alerts = [
  {
    id: '001',
    title: 'System Update',
    description:
      'A scheduled system update will occur tonight between 2 AM and 4 AM. During this time, the service may be temporarily unavailable.',
    date: '2024-07-30 12:45 PM',
    severity: 'MEDIUM',
  },
  {
    id: '002',
    title: 'Security Alert',
    description:
      'Unusual login activity has been detected on your account. Please review recent login attempts and change your password if necessary.',
    date: '2024-07-29 04:34 AM',
    severity: 'HIGH',
  },
  {
    id: '003',
    title: 'Maintenance Window',
    description:
      'Planned maintenance on the payment gateway will be carried out from 1 AM to 3 AM. Please complete any transactions before this time.',
    date: '2024-07-31 10:23 PM',
    severity: 'MEDIUM',
  },
  {
    id: '004',
    title: 'New Feature Release',
    description:
      'We are excited to announce a new feature in our app: real-time notifications! Update your app to experience the new functionality.',
    date: '2024-07-28 02:45 AM',
    severity: 'LOW',
  },
  {
    id: '005',
    title: 'Data Backup',
    description:
      'A full data backup will take place tonight from 11 PM to 1 AM. You may experience slower performance during this time.',
    date: '2024-07-30 08:00 PM',
    severity: 'LOW',
  },
  {
    id: '006',
    title: 'Server Outage',
    description:
      'Our servers will be down for maintenance from 3 AM to 5 AM. We apologize for any inconvenience this may cause.',
    date: '2024-07-31 01:30 AM',
    severity: 'HIGH',
  },
  {
    id: '007',
    title: 'Password Change Required',
    description:
      'For security reasons, please change your password within the next 24 hours.',
    date: '2024-07-30 09:15 AM',
    severity: 'MEDIUM',
  },
  {
    id: '008',
    title: 'App Update Available',
    description:
      'A new version of the app is available with bug fixes and performance improvements. Please update to the latest version.',
    date: '2024-07-29 11:00 AM',
    severity: 'LOW',
  },
  {
    id: '009',
    title: 'Phishing Alert',
    description:
      'Suspicious email activity has been detected. Do not click on any links and report the email to our support team.',
    date: '2024-07-30 03:25 PM',
    severity: 'HIGH',
  },
  {
    id: '010',
    title: 'Service Interruption',
    description:
      'We are currently experiencing service interruptions. Our team is working to resolve the issue as quickly as possible.',
    date: '2024-07-31 05:00 PM',
    severity: 'MEDIUM',
  },
  {
    id: '011',
    title: 'Holiday Schedule',
    description:
      'Please note that our support team will be unavailable on August 1st due to a public holiday.',
    date: '2024-07-30 10:00 AM',
    severity: 'LOW',
  },
  {
    id: '012',
    title: 'System Upgrade',
    description:
      'We will be upgrading our systems on August 2nd from 12 AM to 6 AM. Expect possible delays during this time.',
    date: '2024-07-30 07:45 PM',
    severity: 'MEDIUM',
  },
  {
    id: '013',
    title: 'Feature Deprecated',
    description:
      'The feature you have been using will be deprecated starting August 5th. Please switch to the new feature available in the latest update.',
    date: '2024-07-29 04:00 PM',
    severity: 'LOW',
  },
  {
    id: '014',
    title: 'Service Announcement',
    description:
      'We are enhancing our services to provide better performance. Expect minor disruptions from 2 AM to 4 AM.',
    date: '2024-07-31 09:00 PM',
    severity: 'LOW',
  },
  {
    id: '015',
    title: 'New Policy Update',
    description:
      'Our privacy policy has been updated. Please review the changes to stay informed about how we handle your data.',
    date: '2024-07-30 01:00 PM',
    severity: 'MEDIUM',
  },
  {
    id: '016',
    title: 'Urgent Security Patch',
    description:
      'An urgent security patch is being deployed. Please restart your application to apply the latest updates.',
    date: '2024-07-31 02:30 PM',
    severity: 'HIGH',
  },
  {
    id: '017',
    title: 'Maintenance Completed',
    description:
      'The scheduled maintenance has been completed. All services are now back online.',
    date: '2024-07-31 07:00 AM',
    severity: 'LOW',
  },
  {
    id: '018',
    title: 'Bug Report',
    description:
      'A critical bug has been identified in the system. Our development team is working on a fix and will provide an update soon.',
    date: '2024-07-30 06:00 PM',
    severity: 'HIGH',
  },
  {
    id: '019',
    title: 'Service Update',
    description:
      'We have updated our service terms. Please read the updated terms and conditions on our website.',
    date: '2024-07-30 12:00 PM',
    severity: 'MEDIUM',
  },
  {
    id: '020',
    title: 'Scheduled Downtime',
    description:
      'Our website will be undergoing scheduled downtime for server upgrades on August 3rd from 10 PM to 2 AM.',
    date: '2024-07-31 10:00 AM',
    severity: 'MEDIUM',
  },
  {
    id: '021',
    title: 'Login Issue',
    description:
      'Some users are experiencing login issues. Our team is investigating the problem and will provide an update soon.',
    date: '2024-07-31 03:00 PM',
    severity: 'HIGH',
  },
  {
    id: '022',
    title: 'Feature Enhancement',
    description:
      'We have enhanced the search functionality in the app. Enjoy a more intuitive search experience with the latest update.',
    date: '2024-07-29 06:00 AM',
    severity: 'LOW',
  },
  {
    id: '023',
    title: 'Security Update',
    description:
      'A new security update is available. Please ensure your system is updated to protect against the latest vulnerabilities.',
    date: '2024-07-29 09:45 PM',
    severity: 'HIGH',
  },
  {
    id: '024',
    title: 'Performance Issues',
    description:
      'We are currently experiencing performance issues. Our technical team is working on resolving the problem as quickly as possible.',
    date: '2024-07-30 10:15 AM',
    severity: 'MEDIUM',
  },
  {
    id: '025',
    title: 'Scheduled Maintenance',
    description:
      'Scheduled maintenance will occur on August 4th from 2 AM to 6 AM. We apologize for any inconvenience this may cause.',
    date: '2024-07-30 02:00 PM',
    severity: 'MEDIUM',
  },
  {
    id: '026',
    title: 'App Downtime',
    description:
      'The app will be down for an upgrade on August 1st from 12 AM to 4 AM. Please plan accordingly.',
    date: '2024-07-29 05:00 PM',
    severity: 'MEDIUM',
  },
  {
    id: '027',
    title: 'Data Breach Warning',
    description:
      'A potential data breach has been detected. Please review your account activity and secure your information.',
    date: '2024-07-30 08:30 PM',
    severity: 'HIGH',
  },
  {
    id: '028',
    title: 'New Service Feature',
    description:
      'We are launching a new service feature that allows better customization of your user profile. Check it out in the latest app update.',
    date: '2024-07-31 11:15 AM',
    severity: 'LOW',
  },
  {
    id: '029',
    title: 'Account Verification',
    description:
      'Please verify your account details to ensure uninterrupted service. Follow the link in your email to complete the verification process.',
    date: '2024-07-29 07:00 AM',
    severity: 'MEDIUM',
  },
  {
    id: '030',
    title: 'Upcoming Webinar',
    description:
      'Join us for a webinar on August 5th to learn about the latest trends in technology. Register now to secure your spot.',
    date: '2024-07-30 11:30 AM',
    severity: 'LOW',
  },
  {
    id: '031',
    title: 'Service Enhancement',
    description:
      'We have enhanced our service infrastructure for better performance and reliability. Enjoy an improved user experience.',
    date: '2024-07-30 04:00 PM',
    severity: 'LOW',
  },
  {
    id: '032',
    title: 'Maintenance Reminder',
    description:
      'This is a reminder that scheduled maintenance will occur tonight from 11 PM to 1 AM. Plan accordingly.',
    date: '2024-07-31 02:00 PM',
    severity: 'MEDIUM',
  },
  {
    id: '033',
    title: 'User Feedback Request',
    description:
      'We value your feedback! Please take a moment to fill out our survey and help us improve our services.',
    date: '2024-07-29 08:00 AM',
    severity: 'LOW',
  },
]

export default alerts