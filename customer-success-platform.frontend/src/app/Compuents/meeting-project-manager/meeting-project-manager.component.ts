import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-meeting-project-manager',
  templateUrl: './meeting-project-manager.component.html',
  styleUrl: './meeting-project-manager.component.css',
})
export class MeetingProjectManagerComponent {
  // Initializating the array in which it store all the meeting schedule present in database
  meetingMinutes: any[] = [];

  // Form to take the input data from the user
  meetingMinuteForm: FormGroup;

  // Constructor injecting FormBuilder and Services data
  constructor(private fb: FormBuilder, private service: ServiceService) {
    this.meetingMinuteForm = this.fb.group({
      projectId: ['', Validators.required],
      meetingDate: ['', Validators.required],
      momLink: ['', Validators.required],
      duration: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  // Initiliazting the data after the compunent is build
  ngOnInit(): void {
    this.service.getMeetingMinuteData().subscribe(
      (response) => {
        this.meetingMinutes = response.items;
      },
      (error) => {
        alert('There is promlem while fetching data');
      }
    );
  }

  //AddMeeting function
  addMeetingMinute(): void {
    if (this.meetingMinuteForm.valid) {
      // Making the data variable with same structure as backend need
      const data = {
        projectId: this.meetingMinuteForm.get('projectId')!.value,
        meetingDate: this.meetingMinuteForm.get('meetingDate')!.value,
        duration: this.meetingMinuteForm.get('duration')!.value,
        moMLink: this.meetingMinuteForm.get('momLink')!.value,
        comments: this.meetingMinuteForm.get('comments')!.value,
      };

      // Post method to send the data in backend
      this.service.postMeetingMinuteData(data).subscribe(
        (response) => {
          console.log('Meeting minute added successfully:', response);
          // Optionally reset the form
          this.meetingMinuteForm.reset();
        },
        (error) => {
          alert('Invalid ProjectId input');
          // console.error('Error adding meeting minute:', error);
        }
      );
    } else {
      alert('All fields are mendatory');
    }
  }

  // Update method implimentation
  updateMeetingMinute(meetingMinute: any) {
    const index = this.meetingMinutes.findIndex(
      (m) => m.id === meetingMinute.id
    );
    if (index !== -1) {
      this.meetingMinutes[index] = meetingMinute;
    }
  }

  // Delete method implimentation
  deleteMeetingMinute(id: string) {
    // Deleting from the website
    this.service.deleteMeetingMinuteData(id).subscribe(
      (response) => {
        //In responde it give null value.
      },
      (error) => {
        alert('Some error occur while Deleting the message');
      }
    );
    // Updating the data array
    this.meetingMinutes = this.meetingMinutes.filter((item) => item.id !== id);
  }
}
