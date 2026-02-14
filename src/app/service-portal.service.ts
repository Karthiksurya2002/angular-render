import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicePortalService {
  private dataSource = new BehaviorSubject<string>('');
  currentData = this.dataSource.asObservable();
  updateData(newData: string) {
    this.dataSource.next(newData);
  }

  //url: String = 'http://localhost:8080/shmp';
  url: string = 'https://hospital-backend-pkv3.onrender.com/shmp';

  constructor(private http: HttpClient) {}
  getPublicInfo() {
    return this.http.get(`${this.url}` + '/public/info');
  }
  saveImage(body: any) {
    return this.http.post(`${this.url}` + '/image/save', body);
  }
  getDashboardImage(usage: any) {
    return this.http.get(`${this.url}/image/getdashboardimage?usage=${usage}`, {
      responseType: 'blob',
    });
  }
  addDashboardInformation(body: any) {
    return this.http.post(`${this.url}` + '/dashboard/setTitle', body);
  }
  getDashboardInformation() {
    return this.http.get(`${this.url}` + '/dashboard/getTitle');
  }
  updatePatientCare(body: any) {
    return this.http.post(`${this.url}` + '/image/editPatient', body);
  }
  getPatientCareImage() {
    return this.http.get(`${this.url}` + '/image/getPatientCareImage');
  }
  saveCertificationLogo(body: any) {
    return this.http.post(`${this.url}` + '/image/editCertificsLogo', body);
  }
  getCertificsLogo() {
    return this.http.get(`${this.url}` + '/image/getCertificsLogo', {
      responseType: 'blob',
    });
  }
  saveImageFacilities(body: any) {
    return this.http.post(`${this.url}` + '/image/editImageFacilities', body);
  }
  saveFacilitiesDeatils(body: any) {
    return this.http.post(
      `${this.url}` + '/dashboard/editFacilitiesDeatils',
      body,
    );
  }
  getFacilitiesDeatils() {
    return this.http.get(`${this.url}` + '/dashboard/getFacilitiesDeatils');
  }

  getImageFacilities() {
    return this.http.get(`${this.url}` + '/image/getImageFacilities', {
      responseType: 'blob',
    });
  }
  updateHeartLungsData(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/heartLungsTransplant',
      body,
    );
  }
  getHeartLungsData(usage: any) {
    return this.http.get(
      `${this.url}/patientcare/getHeartLungsTransplant?usage=${usage}`,
    );
  }
  updateProgram(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/heartLungsTransplant/program',
      body,
    );
  }
  updateHeart(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/heartLungsTransplant/heartContent',
      body,
    );
  }
  updateLungs(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/heartLungsTransplant/lungsContent',
      body,
    );
  }
  updateSpecialties(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/bookappointment/updateSpecialties',
      body,
    );
  }
  getSpecialties() {
    return this.http.get(
      `${this.url}` + '/patientcare/bookappointment/getSpecialties',
    );
  }
  addDoctor(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/bookappointment/addDoctor',
      body,
    );
  }
  getDoctor(name: any, searchDoctorByName: any, shfit: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getDoctor?specialty=${name}&searchName=${searchDoctorByName}&shfit=${shfit}`,
    );
  }
  saveDoctorImage(body: any) {
    return this.http.post(`${this.url}` + '/image/saveDoctorImage', body);
  }
  // getDoctorAllImage(body: any) {
  //   return this.http.get(`${this.url}` + '/image/getDoctorAllImage', body);
  // }
  getDoctorAllImage(ids: number[]) {
    const params = { id: ids };
    return this.http.get(`${this.url}/image/getDoctorAllImage`, { params });
  }
  getDoctorById(id: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getDoctorById?id=${id}`,
    );
  }
  updateDoctorById(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/bookappointment/updateDoctorById',
      body,
    );
  }
  updateDoctorImage(body: any) {
    return this.http.post(`${this.url}` + '/image/updateDoctorImageById', body);
  }
  deleteDoctorByIdDetails(id: any) {
    return this.http.delete(
      `${this.url}/patientcare/bookappointment/deleteDoctorById?id=${id}`,
    );
  }
  deleteDoctorByIdImage(id: any) {
    return this.http.delete(`${this.url}/image/deleteDoctorByIdImage?id=${id}`);
  }
  getUserDetails(id: any) {
    return this.http.get(`${this.url}/getUserDetails?id=${id}`);
  }
  bookAppointment(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/bookappointment/reqAppointment',
      body,
    );
  }
  getAppointmentList(id: any, role: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getAppointmentList?id=${id}&role=${role}`,
    );
  }
  cancelAppointment(opNumber: any, role: any) {
    return this.http.delete(
      `${this.url}/patientcare/bookappointment/cancelOp?id=${opNumber}&role=${role}`,
    );
  }
  approveAppointment(opNumber: any, role: any) {
    return this.http.post(
      `${this.url}/patientcare/bookappointment/approveOp?id=${opNumber}&role=${role}`,
      null,
    );
  }
  cancelApprovedAppointment(id: any, role: any) {
    return this.http.post(
      `${this.url}/patientcare/bookappointment/cancelApprovedOp?id=${id}&role=${role}`,
      {},
    );
  }
  getAppointmentHistory(opNumber: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getAppointmentHistory?opNumber=${opNumber}`,
    );
  }
  onRescheduleAppointment(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/bookappointment/rescheduleAppointment',
      body,
    );
  }
  getDoctorList(id: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getDoctorList?id=${id}`,
    );
  }
  checkSlot(slot: any, doctorId: any, date: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/checkSlotAvailability?doctorId=${doctorId}&slot=${slot}&date=${date}`,
    );
  }
  getQuickDeatils() {
    return this.http.get(
      `${this.url}` + '/patientcare/bookappointment/getQuickDeatils',
    );
  }
  getDashboard(id: any, role: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getDashboard?id=${id}&role=${role}`,
    );
  }
  updateNoShow(opNum: any, role: any) {
    return this.http.post(
      `${this.url}/patientcare/bookappointment/noshow?opNum=${opNum}&role=${role}`,
      {},
    );
  }
  checkStatus() {
    return this.http.post(
      `${this.url}` + '/patientcare/bookappointment/checkStatus',
      {},
    );
  }
  saveConsultations(body: any) {
    return this.http.post(
      `${this.url}` + '/patientcare/bookappointment/saveConsultations',
      body,
    );
  }
  getOpNumberDetails(id: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getOpNumberDetails?opNumber=${id}`,
    );
  }
  getReports(id: any, role: String) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getReports?id=${id}&role=${role}`,
    );
  }
  getUserDetailss(id: any) {
    return this.http.get(
      `${this.url}/patientcare/bookappointment/getUserDetailss?id=${id}`,
    );
  }
}
