# coding=utf-8
# *** WARNING: this file was generated by pulumi. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

from . import _utilities
import typing
# Export this package's modules as members:
from .provider import *
from .static_page import *
_utilities.register(
    resource_modules="""
[
 {
  "pkg": "clouddns",
  "mod": "index",
  "fqn": "pierskarsenbarg_pulumi_clouddns",
  "classes": {
   "clouddns:index:StaticPage": "StaticPage"
  }
 }
]
""",
    resource_packages="""
[
 {
  "pkg": "clouddns",
  "token": "pulumi:providers:clouddns",
  "fqn": "pierskarsenbarg_pulumi_clouddns",
  "class": "Provider"
 }
]
"""
)