import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../dto/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user/user.service';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';
import { AddUserComponent } from '../../../shared/component/add-user/add-user.component';
import { UserDTO } from '../../../shared/dto/userDTO';
import { SuccessDialogComponent } from '../../../shared/component/success-dialog/success-dialog.component';
import { UpdateUserComponent } from '../../../shared/component/update-user/update-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../../../core/service/login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  dto: UserDTO = { name: '', lastName: '', email: '', password: '', roleId: 2 };
  userTest: string = '';
  constructor(
    private userService: UserService,
    private service: LoginService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = [
    'email',
    'name',
    'lastName',
    'roleName',
    'actions',
  ];

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  ngOnInit(): void {
    this.refreshTable();

    this.userTest = this.service.getEmail();
  }

  refreshTable() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.users = data;
      },
    });
  }
  // asjdaskaaa
  passwordDialog(pw: string) {
    let dialog = this.dialog.open(SuccessDialogComponent, {
      width: '450px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });
    dialog.componentInstance.password = pw;
  }

  addEmployee() {
    let dialog = this.dialog.open(AddUserComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });
    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response != undefined) {
          let password = this.passwordGenerator();
          this.dto.name = response.object.value.name;
          this.dto.lastName = response.object.value.lastName;
          this.dto.email = response.object.value.email;
          this.dto.password = password;
          this.dto.roleId = response.object.value.role;
          this.userService.addUser(this.dto).subscribe({
            next: (response) => {
              if (response) {
                this.passwordDialog(password);
                this.refreshTable();
                this.toastr.info('Employee Added!', 'User System', {
                  timeOut: 2000,
                });
              } else {
                this.toastr.error('User allredy exist!', 'User System', {
                  timeOut: 2000,
                });
              }
            },
            error: (err) => {
              this.toastr.error('error!', 'User System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
      error: (err) => {
        this.toastr.error(err, 'User System', {
          timeOut: 2000,
        });
      },
    });
  }
  delete(email: string) {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response != undefined && response?.result == true) {
          this.userService.deleteUser(email).subscribe({
            next: (response) => {
              this.refreshTable();
              if (response != true) {
                this.toastr.success('user deleted', 'User System', {
                  timeOut: 2000,
                });
              }
            },
            error: (err) => {
              this.toastr.error('error occured', 'User System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
    });
  }

  updateEmployee(email: string) {
    this.userService.getUser(email).subscribe({
      next: (resp) => {
        let dialog = this.dialog.open(UpdateUserComponent, {
          width: '300px',
          enterAnimationDuration: '250ms',
          exitAnimationDuration: '250ms',
          backdropClass: 'blurBackGround',
          data: {
            name: resp.name,
            lastName: resp.lastName,
            email: resp.email,
            roleId: resp.roleId,
          },
        });
        dialog.afterClosed().subscribe({
          next: (response) => {
            if (response?.object != undefined) {
              //password reset isteniyorsa
              if (response?.object.value.boolean) {
                this.dto.name = response.object.value.name;
                this.dto.lastName = response.object.value.lastName;
                this.dto.email = response.object.value.email;
                this.dto.password = this.passwordGenerator();
                this.passwordDialog(this.dto.password);
                this.dto.roleId = response.object.value.role;
                this.userService.updateUser(this.dto).subscribe({
                  next: (resp) => {
                    this.refreshTable();
                    this.toastr.info('User Updated', 'User System', {
                      timeOut: 2000,
                    });
                  },
                });
              }
              //password reset istenmiyorsa
              else {
                this.dto.name = response.object.value.name;
                this.dto.lastName = response.object.value.lastName;
                this.dto.email = response.object.value.email;
                this.dto.roleId = response.object.value.role;
                this.userService.updateUser(this.dto).subscribe({
                  next: (resp) => {
                    this.refreshTable();
                    this.toastr.info('User Updated', 'User System', {
                      timeOut: 2000,
                    });
                  },
                });
              }
            }
          },
        });
      },
    });
  }

  // random password generator
  passwordGenerator() {
    let length = 8,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    //random password ==>
    // console.log(retVal);
    return retVal;
  }
}
