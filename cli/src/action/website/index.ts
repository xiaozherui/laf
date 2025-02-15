import { websiteControllerBindDomain, websiteControllerCreate, websiteControllerFindAll, websiteControllerRemove } from "../../api/v1/websitehosting"
import { readApplicationConfig } from "../../config/application"
import * as Table from 'cli-table3'
import { formatDate } from "../../util/format"
import { BindCustomDomainDto, CreateWebsiteDto } from "../../api/v1/data-contracts"
import { getEmoji } from "../../util/print"


export async function list() {
  const appConfig = readApplicationConfig()
  const websites = await websiteControllerFindAll(appConfig.appid)
  const table = new Table({
    head: ['bucketName', 'domain', 'state', 'updatedAt'],
  })
  for (let item of websites) {
    table.push([item.bucketName, item.domain, item.state, formatDate(item.updatedAt),])
  }
  console.log(table.toString())
}

export async function create(bucketName: string, options: any) { 
  const appConfig = readApplicationConfig()

  if (!bucketName.startsWith(appConfig.appid + '-')) {
    bucketName = appConfig.appid + '-' + bucketName
  }

  const createDto: CreateWebsiteDto = {
    bucketName,
    state: 'Active',
  }
  const website = await websiteControllerCreate(appConfig.appid, createDto)

  if (options) { }

  console.log(`${getEmoji('✅')} create website success!`)
  console.log(`You can access through this domain: ${website.domain}`)
}

export async function del(bucketName: string, options: any) {
  const appConfig = readApplicationConfig()
  const websites = await websiteControllerFindAll(appConfig.appid)

  if (options) {
  }

  if (!bucketName.startsWith(appConfig.appid + '-')) {
    bucketName = appConfig.appid + '-' + bucketName
  }

  const targetId = websites.find((item) => item.bucketName === bucketName)?.id
  if (!targetId) {
    console.log(`${getEmoji('❌')} website ${bucketName} not found`)
    return
  }
  await websiteControllerRemove(appConfig.appid, targetId)

  console.log(`${getEmoji('✅')} delete website success!`)  
}

export async function custom(bucketName: string, domain: string, options: any) {
  const appConfig = readApplicationConfig()
  const websites = await websiteControllerFindAll(appConfig.appid)

  if (options) {
  }

  if (!bucketName.startsWith(appConfig.appid + '-')) {
    bucketName = appConfig.appid + '-' + bucketName
  }

  const targetId = websites.find((item) => item.bucketName === bucketName)?.id
  if (!targetId) {
    console.log(`${getEmoji('❌')} website ${bucketName} not found`)
    return
  }

  const patchDto: BindCustomDomainDto = {
    domain,
  }
  const website = await websiteControllerBindDomain(appConfig.appid, targetId, patchDto)

  console.log(`${getEmoji('✅')} bind custom success!`)
  console.log(`You can access through this domain: ${website.domain}`)
}