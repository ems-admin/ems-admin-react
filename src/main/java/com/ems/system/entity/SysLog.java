package com.ems.system.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * @program: ems-admin-boot
 * @description: this is a class
 * @author: starao
 * @create: 2021-11-27 13:25
 **/
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "sys_log")
public class SysLog implements Serializable {

    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 日志类型（1正常 2错误）
     */
    private String logType;

    /**
     * 请求方式
     */
    private String method;

    /**
     * 请求参数
     */
    private String params;

    /**
     * 耗时（毫秒）
     */
    private Long time;

    /**
     * IP
     */
    private String ip;

    /**
     * 请求用户名
     */
    private String username;

    /**
     * 错误信息详情
     */
    private String exceptionDetail;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GTM+8")
    private LocalDateTime createTime;

    /**
     * 描述
     */
    private String description;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    public SysLog(String logType, long time){
        this.logType = logType;
        this.time = time;
    }
}
