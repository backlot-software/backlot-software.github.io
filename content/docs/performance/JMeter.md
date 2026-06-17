+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "JMeter"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# JMeter

With JMeter it is possible to test scenarios with multiple virtual users. For the official documentation go to: [JMeter documentation](https://jmeter.apache.org/usermanual/get-started.html).

### Steps for Running a Performance Test with JMeter

Every time a test scenario needs to be tested the tester writes a test scenario in JMeter.
  
Use steps 1 through 11 from the step-by-step guide as described on [this page][1].

Save the results. Screenshot the tables and reports. Also, the aggregate report can be downloaded in .csv format.

### Customizing Tests

It is also possible to write your own test scenario in JMeter. The [documentation site](https://jmeter.apache.org/usermanual/get-started.html) contains everything you can do in JMeter. This chapter is intended for testers who would like a bit of customization for a Chaplin scenario. 

## Create the first Test Plan

The first step is creating the test plan is:

**Adding a Thread Group**

 - Open the JMeter window
 - The window is divided in two parts. The left side has all the elements, while the right side has all the elements configurations.
 - Optional: rename the test plan
 - Right-click on the test plan.
 - Go to add -> Threads (Users) -> Thread Group

![Adding thread group][2]

Now, once you click on the Thread Group, there are three things on the screen that are important concerning the load test:  

 - *The number of threads (users):*  

This is the number of threads JMeter will simulate.  

 - *Ramp-Up Period (in seconds):*  

This is the time that JMeter takes before starting the thread over.  

 - *Loop Count*  

This is the number of times the test will be executed.

![Thread group settings][3]
  
The next step is to

**Add an HTTP Request**

 - Right-click on Test Plan and again go to add  
 - In the drop-down select samplers  
 - For now, choose the HTTP request.

![Adding a HTTP request][4]

Here, in the Server Name or IP box, you have to give the server name or the IP.

Now, when the test is ready, the next step is to perform a test on it. To perform the test:  

**Add listeners**

To determine what the results of the test will be, you need to add some more test elements.

 - Right-click on Test Plan
 - Go to listeners options

![Adding listeners][5]

In the box that appears, there are different types of reports that JMeter provides.  

Select the following:
 - View results in table
 - View results tree  

**Run the test**

 - Now, save the test and run it
 - For running the test, click the green button
 - Now, check the results of the test
 - View the results in your listeners

### Write Request Defaults

When a scenario contains multiple steps. For example: logging in, adding items to shopping cart and paying. It is a good idea to add some request defaults.

With the request defaults it is possible to define your defaults, which are needed for every step in a scenario. For example, when testing locally. It can be defined in the request defaults and every request where it is not overwritten will test against localhost. 

### Adding Assertions

There are different types of assertions for which it is possible to assert. With a duration assertion it is possible to assert for a certain duration, and with a response assertion it is possible to assert for certain response. 

If a request does not pass the assertion the results will show the request as failed. 

  [1]: Full-test-scenario.md
  [2]: adding-threadgroup.png
  [3]: threadgroup-settings.png
  [4]: adding-httprequest.png
  [5]: adding-listeners.png