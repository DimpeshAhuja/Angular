import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import emailjs from 'emailjs-com';  
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-email',
  imports: [CommonModule,ReactiveFormsModule,FormControl,FormGroup,RouterLink],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent implements OnInit{

  contact = new FormGroup({
    subject: new FormControl(''),
    message: new FormControl(''),  
  });

  responseMessage: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contact.valid) {
      const formData = this.contact.value;
  
      
      const templateParams = {
        to_name: 'Admin',    
        from_name: 'User',      
        subject: formData.subject, 
        message: formData.message  
      };
  
    
      emailjs.init('JeoTGE4JVCsfF3zvH'); 
  
     
      emailjs
        .send(
          'service_e0v26oq',  
          'template_fzq7r8s',  
          templateParams,
          'JeoTGE4JVCsfF3zvH' 
        )
        .then(
          (response) => {
            console.log('Email sent successfully:', response);
            this.responseMessage = 'Your query has been sent successfully!';
            this.contact.reset(); 
          },
          (error) => {
            console.error('Error sending email:', error);
            this.responseMessage = 'Failed to send your query';
          }
        );
    } else {
      this.responseMessage = 'Please fill out all fields.';
    }
}
}
