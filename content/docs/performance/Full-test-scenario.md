+++
weight = 100
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Full Test Scenario"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


## Steps for running a Performance Test Chaplin

 Every time someone want to execute a test scenario on Chaplin they make a request with JMeter and with JMeter in combination with dotTrace.
  
### Prerequisites 

 - Visual Studio with the latest version of Chaplin and Versla.
 - JMeter installed.
	 - [How to Download and Install JMeter for Windows](https://www.simplilearn.com/tutorials/jmeter-tutorial/jmeter-installation).
 - DotTrace installed.
 - The database instance installed where you want to test Chaplin on. 
 
### Step-by-step Guide 

1. Open visual studio with the correct code base Marvelous.Versla.Server.

2. Start Raven.Server.exe.

  - If you type `openbrowser`. A new tab in your browser will open. Which makes it easier to view the data.  
 
3. Open JMeter.

   - [How to Download and Install JMeter for Windows [2022 Edition] | Simplilearn](https://www.simplilearn.com/tutorials/jmeter-tutorial/jmeter-installation)

    If you already have the JMeter plugin manager with the plug-ins: 3 basic graphs, Command-line Graph Plotting Tool, Custom Thread Groups and Graphs Generator Listener. You can skip to step 8.

4. Download and install the JMeter plugin manager: [Documentation :: JMeter-Plugins.org](https://jmeter-plugins.org/wiki/PluginsManager/#Installation-and-Usage).

5. Re-start JMeter.

6. Install the following plug-ins with the manager:
   - 3 Basic Graph,
   - Command-Line Graph Plotting Tool;
   - Custom Thread Groups;
   - Graphs Generator Listener.

7. Download the JMeter script from Basecamp: [Chaplin_50Request_in_5_seconds.jmx (basecamp.com)](https://3.basecamp.com/3094795/buckets/24365546/uploads/5507180532).

8. Open the test script in JMeter.

9. Start the Versla server without debugging!
   - The shortcut for running without debugger in Windows is: ctrl+f5.

10. Make sure the database is empty.

11. Run the test in JMeter.
    - For running the test, click the green button;
    - Now, check the results of the test;
    - Go to view results in table.

    If you only wanted JMeter results: save the results. You can screenshot and analyze them. If you needed to test multiple scenarios go back to step 7. If you wanted to test run a new test on a new instance stop te server and go back to step 6.

### Attaching dotTrace

12. Clear the results in JMeter.

13. Open dotTrace.

    - If you want to start a new server instance you should do it now.

14. Attach dotTrace.

    1. Select the Marvelous.Versla.Server instance.
        - If the server isn't visible press show processes of al users
    2. Select Sampling.
    3. Make sure the collection data from start is turned off.
    4. Press start when ready. 

![DotTrace attach versla server][1]

15. Press the start button to start profiling.
    - You should see a black arrow on the screen.

16. Make a request or run a test scenario. 

17. As soon as the request is finished you can press: Get Snapshot and Wait.
    - Basecamp already has a document on how to profile snapshots, which you can find here: [Analyze_sampling_snapshot.pdf (basecamp.com)](https://3.basecamp.com/3094795/buckets/24365546/uploads/5492293118)

When seriously testing features in JMeter and dotTrace try using the following scenarios. You should use the newest test scenario.

Each test will be executed two times in the same instance, because the first call is slower than all the other tests on the same instance. In: [School sprint 4 JMeter tests.pdf (basecamp.com)](https://3.basecamp.com/3094795/buckets/24365546/uploads/5498133299) there is an example of how I documented my test results. 

  [1]: dottrace-attach-versla-server.png