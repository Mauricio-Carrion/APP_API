@ECHO OFF
REM  QBFC Project Options Begin
REM  HasVersionInfo: No
REM  Companyname: 
REM  Productname: 
REM  Filedescription: 
REM  Copyrights: 
REM  Trademarks: 
REM  Originalname: 
REM  Comments: 
REM  Productversion:  0. 0. 0. 0
REM  Fileversion:  0. 0. 0. 0
REM  Internalname: 
REM  Appicon: ..\Compilador\JF.ICO
REM  AdministratorManifest: Yes
REM  QBFC Project Options End
ECHO ON
@echo off

cls
  
   C:
   CD\Program Files (x86)\Firebird\Firebird_2_5\bin\
   path C:\Program Files (x86)\Firebird\Firebird_2_5\bin

   gsec -user sysdba -password masterkey -add JFFDB08 -pw jj0902
   set isc_user=JFFDB08
   set isc_password=jj0902

Exit