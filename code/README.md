后台
prisma migrate dev

npx prisma migrate dev --name init

[MY-010454] [Server] A temporary password is generated for root@localhost: Tpdb>KxVi9=H

CREATE USER 'dev'@'%' IDENTIFIED BY 'Password123!';

Beginning configuration step: Writing configuration file

Saving my.ini configuration file...
Saved my.ini configuration file.
Ended configuration step: Writing configuration file

Beginning configuration step: Updating Windows Firewall rules

Adding a Windows Firewall rule for MySQL90 on port 3306.
Attempting to add a Windows Firewall rule with command: netsh.exe advfirewall firewall add rule name="Port 3306" protocol=TCP localport=3306 dir=in action=allow
确定。

Successfully added the Windows Firewall rule.
Adding a Windows Firewall rule for MySQL90 on port 33060.
Attempting to add a Windows Firewall rule with command: netsh.exe advfirewall firewall add rule name="Port 33060" protocol=TCP localport=33060 dir=in action=allow
确定。

Successfully added the Windows Firewall rule.
Ended configuration step: Updating Windows Firewall rules

Beginning configuration step: Adjusting Windows service

Attempting to grant the required filesystem permissions to the 'NT AUTHORITY\NetworkService' account.
Granted permissions to the data directory.
Granted permissions to the install directory.
Adding new service
New service added
Ended configuration step: Adjusting Windows service

Beginning configuration step: Initializing database (may take a long time)

Attempting to run MySQL Server with --initialize-insecure option...
Starting process for MySQL Server 9.0.1...
Starting process with command: C:\Program Files\MySQL\MySQL Server 9.0\bin\mysqld.exe --defaults-file="D:\ProgramData\MySQL\MySQL Server 9.0\my.ini" --console --initialize-insecure=on --lower-case-table-names=1...
MySQL Server Initialization - start.
C:\Program Files\MySQL\MySQL Server 9.0\bin\mysqld.exe (mysqld 9.0.1) initializing of server in progress as process 1612
InnoDB initialization has started.
InnoDB initialization has ended.
root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
MySQL Server Initialization - end.
Process for mysqld, with ID 1612, was run successfully and exited with code 0.
Successfully started process for MySQL Server 9.0.1.
MySQL Server 9.0.1 intialized the database successfully.
Ended configuration step: Initializing database (may take a long time)

Beginning configuration step: Updating permissions for the data folder and related server files

Attempting to update the permissions for the data folder and related server files...
Inherited permissions have been converted to explicit permissions.
Full control permissions granted to: NETWORK SERVICE.
Full control permissions granted to: Administrators.
Full control permissions granted to: CREATOR OWNER.
Full control permissions granted to: SYSTEM.
Access to the data directory is removed for the users group.
Permissions for the data folder and related server files are updated correctly.
Ended configuration step: Updating permissions for the data folder and related server files

Beginning configuration step: Starting the server

Attempting to start service MySQL90...
MySQL Server - start.
C:\Program Files\MySQL\MySQL Server 9.0\bin\mysqld.exe (mysqld 9.0.1) starting as process 25044
InnoDB initialization has started.
InnoDB initialization has ended.
CA certificate ca.pem is self signed.
Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
X Plugin ready for connections. Bind-address: '::' port: 33060
C:\Program Files\MySQL\MySQL Server 9.0\bin\mysqld.exe: ready for connections. Version: '9.0.1' socket: '' port: 3306 MySQL Community Server - GPL.
Successfully started service MySQL90.
Waiting until a connection to MySQL Server 9.0.1 can be established (with a maximum of 10 attempts)...
Retry 1: Attempting to connect to Mysql@localhost:3306 with user root with no password...
Successfully connected to MySQL Server 9.0.1.
Ended configuration step: Starting the server

Beginning configuration step: Applying security settings

Attempting to update security settings.
Updated security settings.
Ended configuration step: Applying security settings

Beginning configuration step: Updating the Start menu link

Attempting to verify command-line client shortcut.
Verified command-line client shortcut.
Verified command-line client shortcut.
Ended configuration step: Updating the Start menu link

给用户分配 code，
用户点读记录 1
用户的资料更新 1
列表查询添加过滤 1

微信小程序，用户展示 book 1
微信登陆
给用户点读记录 做排行榜  
用户资料更新的 报告
· ·
